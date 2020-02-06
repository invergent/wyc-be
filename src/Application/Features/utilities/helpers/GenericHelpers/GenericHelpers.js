import { Op } from 'sequelize';
import models from '../../../../Database/models';
import Dates from '../Dates';

const { Claims, Staff } = models;

class GenericHelpers {
  static createUpdatePayload(approvalType) {
    const payload = {};
    if (approvalType === 'decline') {
      payload.status = 'Declined';
    } else {
      payload.status = 'Completed';
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
          where: { status: 'Pending', editRequested: false }
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
        as: 'claimer',
        include: ['branch', 'role', 'lineManager']
      }]
    };
    return options;
  }

  static createColumnHeaderKeys(header) {
    const key = header
      .toLowerCase()
      .replace(/\//g, '')
      .replace(/ /g, '')
      .replace(/no/g, 'Id')
      .replace(/solid/g, 'solId')
      .replace(/number/g, 'Number')
      .replace(/jobfunction/g, 'role')
      .replace(/duty/g, 'Duty')
      .replace(/support/g, 'Support')
      .replace(/outstationallowance/g, 'outstation')
      .replace(/approveremailaddress/g, 'approverEmail')
      .replace(/monthofclaim/g, 'monthOfClaim');
    return key;
  }

  static fetchPendingClaimsOptions(statusType) {
    return {
      where: { ...GenericHelpers.claimStatusFilter(statusType) },
      include: ['claimer'],
      plain: false,
      raw: true
    };
  }

  static fetchCompletedClaimsQueryOptions() {
    const options = GenericHelpers.adminBulkSortQueryOptions('Completed');
    options.include = ['claimer'];
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
      include: [{ model: Staff, as: 'claimer', where: { staffId } }, 'approvalHistory']
    };
  }
}

export default GenericHelpers;
