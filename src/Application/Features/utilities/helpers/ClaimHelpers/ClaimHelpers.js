import Dates from '../Dates';
import ClaimService from '../../services/ClaimService';

class ClaimHelpers {
  static createOvertimeRequestObject(overtimeRequest, staffId) {
    return {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...overtimeRequest,
      requester: staffId,
      amount: overtimeRequest.amount,
      status: 'Pending'
    };
  }

  static responseMessage(overtimeRequest) {
    return {
      messageWhenCreated: 'Your claim request was created successfully.',
      messageWhenNotCreated: `You have already submitted a claim request for ${
        overtimeRequest.monthOfClaim
      }. If you wish to make changes, please cancel the current claim and create a new one.`
    };
  }

  static filterQueryResult(queryResult) {
    const pendingClaims = queryResult.subordinates;

    if (!pendingClaims.length) return [];
    
    return pendingClaims.map((result) => {
      const {
        staffId, firstname, lastname, middlename, image, Claims
      } = result;
      const {
        id, monthOfClaim, claimElements, details, amount
      } = Claims[0];
      return {
        staffId,
        firstname,
        lastname,
        middlename,
        image,
        id,
        monthOfClaim,
        claimElements,
        details,
        amount
      };
    });
  }

  static filterReminderPendingClaims(queryResult) {
    return queryResult.map((result) => {
      const {
        id: claimId, monthOfClaim, amount, 'claimer.firstname': firstname, 'claimer.email': email,
        'claimer.staffId': staffId
      } = result;
      return {
        claimId, staffId, monthOfClaim, amount, firstname, email
      };
    });
  }

  static filterCompletedClaims(queryResult) {
    return ClaimHelpers.filterReminderPendingClaims(queryResult);
  }

  static getIdsOfFilteredPendingClaims(filteredPendingClaims) {
    return filteredPendingClaims.map(claim => claim.id);
  }

  static async pendingClaimsForlineManager(lineManager) {
    const results = await ClaimService.fetchPendingClaimsForLineManagers(lineManager);
    const { firstname, lastname } = results; // line manager details
    const filteredResults = ClaimHelpers.filterQueryResult(results.toJSON());
    return { lineManager: { firstname, lastname }, pendingClaims: filteredResults };
  }

  static async getIdsOfClaimsAssignedToLineManager(lineManager) {
    const result = await ClaimHelpers.pendingClaimsForlineManager(lineManager);
    const pendingClaimIds = ClaimHelpers.getIdsOfFilteredPendingClaims(result.pendingClaims);
    return pendingClaimIds;
  }

  static async getStaffClaimStats(staffId) {
    const claims = await ClaimService.fetchStaffClaims(staffId);
    const claimStats = {
      total: claims.length, completed: 0, declined: 0, cancelled: 0
    };
    return claims.reduce(ClaimHelpers.statAccumulator, claimStats);
  }

  static statAccumulator(acc, claim) {
    if (claim.status === 'Completed') acc.completed += 1;
    if (claim.status === 'Declined') acc.declined += 1;
    if (claim.status === 'Cancelled') acc.cancelled += 1;
    return acc;
  }

  static async fetchStaffPendingClaim(staffId) {
    // a hack for a claim that is either pending or processing
    const pendingClaim = await ClaimService.fetchStaffClaims(staffId, 'ing');
    if (!pendingClaim.length) return [];

    const {
      id, monthOfClaim, claimElements, amount, details, editRequested, editMessage, status, createdAt, approvalHistory
    } = pendingClaim[0];
    return [{
      id, monthOfClaim, claimElements, amount, details, editRequested, editMessage, status, createdAt, approvalHistory
    }];
  }
}

export default ClaimHelpers;
