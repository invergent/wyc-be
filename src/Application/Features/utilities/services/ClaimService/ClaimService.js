import { Op } from 'sequelize';
import models from '../../../../Database/models';
import ClaimApprovalHistoryService from '../ClaimApprovalHistoryService';
import GenericHelpers from '../../helpers/GenericHelpers';
import BasicQuerier from '../BasicQuerier';

const { Claims, LineManagers, ClaimsStatistics } = models;

class ClaimService {
  static findOrCreateClaim(overtimeRequest) {
    return Claims.findOrCreate({
      where: {
        monthOfClaim: overtimeRequest.monthOfClaim,
        requester: overtimeRequest.requester,
        status: { [Op.like]: { [Op.any]: ['Completed', 'Processing', 'Pending'] } }
      },
      defaults: overtimeRequest,
      raw: true
    });
  }

  static findClaimByPk(claimId) {
    return BasicQuerier.findByPk('Claims', claimId);
  }

  static fetchPendingClaims(statusType) {
    const options = GenericHelpers.fetchPendingClaimsOptions(statusType);
    return Claims.findAll(options);
  }

  static updateClaim(updatePayload, claimId) {
    return BasicQuerier.update('Claims', updatePayload, claimId);
  }

  static fetchPendingClaimsForLineManagers(lineManager) {
    const queryOptions = GenericHelpers.createLineManagerQueryOptions(lineManager);
    return LineManagers.findOne(queryOptions);
  }

  static async runClaimApproval(lineManager, claimId, approvalType) {
    const { id: lineManagerId } = lineManager;
    const updatePayload = GenericHelpers.createUpdatePayload(approvalType);

    const [updated, claim] = await ClaimService.updateClaim(updatePayload, claimId);
    const history = await ClaimApprovalHistoryService.createApprovalHistory(
      approvalType, claimId, lineManagerId
    );

    const updatedClaim = { ...claim[0], history: history.dataValues };
    return [updated, updatedClaim];
  }

  static approveClaim(lineManager, claimId) {
    return ClaimService.runClaimApproval(lineManager, claimId, 'approve');
  }

  static declineClaim(lineManager, claimId) {
    return ClaimService.runClaimApproval(lineManager, claimId, 'decline');
  }

  static cancelClaim(claimId) {
    const updatePayload = { status: 'Cancelled' };
    return ClaimService.updateClaim(updatePayload, claimId);
  }

  static fetchSubmittedClaims(statusType, period) {
    const options = GenericHelpers.adminFetchClaimOptions(statusType, period);
    return Claims.findAll(options);
  }

  static fetchCompletedClaim() {
    const options = GenericHelpers.fetchCompletedClaimsQueryOptions();
    return Claims.findAll(options);
  }

  static fetchClaimsInProcessingForExports(statusType) {
    const options = GenericHelpers.adminFetchClaimOptions(statusType);
    return Claims.findAll(options);
  }

  static markClaimsAsCompleted() {
    const options = GenericHelpers.claimsInProcessingOptions();
    const payload = { status: 'Completed' };
    return Claims.update(payload, options);
  }

  static fetchStaffClaims(staffId, status) {
    const options = GenericHelpers.staffPendingClaimOptions(staffId, status);
    return Claims.findAll(options);
  }

  static getChartStatistics() {
    const currentYear = new Date().getFullYear();
    const options = { where: { year: currentYear } };
    return ClaimsStatistics.findOne(options);
  }

  static updateChartStatistics(year, statPayload) {
    const options = { where: { year } };
    return ClaimsStatistics.update(statPayload, options);
  }

  static createChartStatistics(statPayload) {
    return ClaimsStatistics.create(statPayload);
  }
}

export default ClaimService;
