import {
  Op, where, cast, col
} from 'sequelize';
import models from '../../../../Database/models';
import Dates from '../Dates';

const { Claims, Staff } = models;

class GenericHelpers {
  static createUpdatePayload(approvalType) {
    const payload = {};
    if (approvalType === 'decline') {
      payload.status = 'Declined';
    } else {
      payload.status = 'Processing';
    }
    return payload;
  }

  static createLineManagerQueryOptions(lineManager) {
    const { id } = lineManager;
    const options = {
      where: { id },
      include: [{
        model: Staff,
        as: 'subordinates',
        include: [{
          model: Claims,
          where: { status: 'Pending' }
        }]
      }]
    };

    return options;
  }

  static periodToFetch() {
    const { year, month } = Dates.getCurrentYearMonth();
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    return firstDayOfCurrentMonth;
  }

  static claimStatusFilter(statusType) {
    const statusFilter = {};
    if (statusType) statusFilter.status = { [Op.iLike]: `%${statusType}%` };
    return statusFilter;
  }

  static adminFetchClaimOptions(statusType, period) {
    const options = {
      where: {
        createdAt: { [Op.gte]: GenericHelpers.periodToFetch(period) },
        ...GenericHelpers.claimStatusFilter(statusType)
      },
      include: [{
        model: Staff,
        include: ['branch', 'role']
      }],
      raw: true
    };
    return options;
  }

  static createColumnHeaderKeys(header) {
    const key = header
      .toLowerCase()
      .replace(/\//g, '')
      .replace(/ id/g, 'Id')
      .replace(/ /g, '')
      .replace(/duty/g, '')
      .replace(/monthofclaim/g, 'monthOfClaim');
    return key;
  }

  static fetchPendingClaimsOptions(statusType) {
    return {
      where: { ...GenericHelpers.claimStatusFilter(statusType) },
      include: [Staff],
      plain: false,
      raw: true
    };
  }

  static claimsInProcessingOptions() {
    const options = GenericHelpers.adminBulkSortQueryOptions('Processing');
    return options;
  }

  static fetchCompletedClaimsQueryOptions() {
    const options = GenericHelpers.adminBulkSortQueryOptions('Completed');
    options.include = [Staff];
    return options;
  }

  static adminBulkSortQueryOptions(statusType) {
    return {
      where: {
        createdAt: { [Op.gte]: GenericHelpers.periodToFetch() },
        ...GenericHelpers.claimStatusFilter(statusType)
      },
      plain: false,
      raw: true
    };
  }

  static staffPendingClaimOptions(staffId, statusType) {
    return {
      where: { ...GenericHelpers.claimStatusFilter(statusType) },
      include: [{ model: Staff, where: { staffId } }, 'approvalHistory']
    };
  }
}

export default GenericHelpers;
