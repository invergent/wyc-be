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
        year: overtimeRequest.year,
        monthOfClaim: overtimeRequest.monthOfClaim,
        requester: overtimeRequest.requester,
        status: { [Op.like]: { [Op.any]: ['Completed', 'Pending'] } }
      },
      defaults: overtimeRequest,
      raw: true
    });
  }

  static findClaimByPk(claimId, includes) {
    return BasicQuerier.findByPk('Claims', claimId, includes);
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

  static fetchSubmittedClaims(query, forExports) {
    const options = GenericHelpers.adminFetchClaimOptions(query, forExports);
    return query ? Claims.findAndCountAll(options) : Claims.findAll(options);
  }

  static fetchCompletedClaim() {
    const options = GenericHelpers.fetchCompletedClaimsQueryOptions();
    return Claims.findAll(options);
  }

  static fetchStaffClaims(staffId, status) {
    const options = GenericHelpers.staffPendingClaimOptions(staffId, status);
    return Claims.findAll(options);
  }

  static getChartStatistics() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const showLastYear = currentMonth < 2;
    const options = { where: { year: showLastYear ? (currentYear - 1) : currentYear } };
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
