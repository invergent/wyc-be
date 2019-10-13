import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames, activityNames } from '../utilities/utils/types';


const { ClaimService, StaffService, LineManagerService } = services;
const { ClaimHelpers } = helpers;

class Claim {
  static async create(req) {
    const { currentStaff: { staffId }, body } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId, ['lineManager']);
      const overtimeRequest = ClaimHelpers.createOvertimeRequestObject(body, staff.id);
      const { messageWhenCreated, messageWhenNotCreated } = ClaimHelpers.responseMessage(
        overtimeRequest
      );

      const [claim, created] = await ClaimService.findOrCreateClaim(overtimeRequest);
      if (created) {
        notifications.emit(eventNames.NewClaim, [staff.toJSON(), claim.id, activityNames.NewClaim]);
      }

      return created ? [201, messageWhenCreated, claim] : [409, messageWhenNotCreated, claim];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem submitting your request ERR500CLMCRT'];
    }
  }

  static async sendPendingClaimsTolineManager(req) {
    const { lineManager } = req;
    const results = await ClaimHelpers.pendingClaimsForlineManager(lineManager);
    // An empty result still returned the manager's details.
    // This checks if claims were also returned
    if (!results.pendingClaims.length) {
      return [404, 'You currently have no pending claims to approve.', results];
    }
    return [200, `You have ${results.pendingClaims.length} claims to approve.`, results];
  }

  static async checkThatClaimIsAssignedToLineManager(lineManager, claimId) {
    const assignedClaims = await ClaimHelpers.getIdsOfClaimsAssignedToLineManager(lineManager);
    if (!assignedClaims.includes(parseInt(claimId, 10))) {
      return [403, 'This claim is not on your pending list. Access denied.'];
    }
    return [200, 'okay'];
  }

  static async runClaimApproval(req, approvalType) {
    const { params: { claimId }, lineManager } = req;
    const approvalMethod = approvalType === 'Approved' ? 'approveClaim' : 'declineClaim';

    const [statusCode, message] = await Claim.checkThatClaimIsAssignedToLineManager(lineManager, claimId);
    if (statusCode === 403) return [statusCode, message];

    const [updated, claim] = await ClaimService[approvalMethod](lineManager, claimId);
    return [200, `Claim${updated ? '' : ' not'} ${approvalType.toLowerCase()}.`, claim];
  }

  static async runApprovalAndNotifyUsers(req, approvalType) {
    const [statusCode, message, data] = await Claim.runClaimApproval(req, approvalType);
    if (statusCode !== 200) return [statusCode, message];

    const staff = await StaffService.fetchStaffByPk(data.requester, ['lineManager']);
    notifications.emit(
      eventNames[`lineManager${approvalType}`], [staff.toJSON()]
    );

    return [statusCode, message, data];
  }

  static async approve(req) {
    return Claim.runApprovalAndNotifyUsers(req, 'Approved');
  }

  static decline(req) {
    return Claim.runApprovalAndNotifyUsers(req, 'Declined');
  }

  static async cancel(req) {
    const { params: { claimId }, claim } = req;
    let newExtraMonthsData;

    if (claim.status !== 'Pending') {
      return [403, 'Operation failed. Only pending claims can be cancelled.'];
    }

    // if staff applied for multiple months, replace cancelled claim
    if (claim.claimer.extraMonthsPermitted) {
      newExtraMonthsData = Claim.replaceCancelledClaim(claim);
      StaffService.updateStaffInfo(claim.claimer.staffId, newExtraMonthsData);
    }
    
    try {
      const [updated, updatedClaim] = await ClaimService.cancelClaim(claimId, newExtraMonthsData);
      if (updated) {
        notifications.emit(eventNames.Cancelled, [claim.claimer, claimId, activityNames.Cancelled]);
      }
      return [200, `Claim${updated ? '' : ' not'} cancelled.`, updatedClaim[0]];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem cancelling your claim ERR500CLMCNL.'];
    }
  }

  static replaceCancelledClaim(claim) {
    // re-adds the cancelled claim back to the list of permittedMonths
    const { details, claimer: { extraMonthsData: { permittedMonths, appliedMonths } } } = claim;
    const { applyingMonth } = JSON.parse(details);

    return {
      extraMonthsData: {
        permittedMonths: [...permittedMonths, applyingMonth].sort(),
        appliedMonths: appliedMonths.filter(month => month !== applyingMonth)
      }
    };
  }

  static async requestEdit(req) {
    const { params: { claimId }, body: { editMessage } } = req;

    try {
      const claim = await ClaimService.findClaimByPk(claimId, ['claimer']);
      const [updated, updatedClaim] = await ClaimService.updateClaim({ editMessage, editRequested: true }, claimId);
      if (updated) {
        notifications.emit(eventNames.EditRequested, [claim.claimer.toJSON(), claimId]);
      }
      return [200, `Edit${updated ? '' : ' not'} requested.`, updatedClaim[0]];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem requesting edit ERR500EDTREQ.'];
    }
  }
  
  static async updateOvertimeClaim(req) {
    const { params: { claimId }, claim: { claimer: staff }, body } = req;
    body.editRequested = false;
    body.editMessage = null;
    try {
      const [updated, claim] = await ClaimService.updateClaim(body, claimId);
      if (updated) {
        const lineManager = await LineManagerService.findLineManagerByPk(staff.lineManagerId);
        staff.lineManager = lineManager;
        notifications.emit(eventNames.Updated, [staff, claimId, activityNames.Updated]);
      }
      return [200, `Claim${updated ? '' : ' not'} updated.`, claim[0]];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem updating your claim ERR500UPDCLM.'];
    }
  }
}

export default Claim;
