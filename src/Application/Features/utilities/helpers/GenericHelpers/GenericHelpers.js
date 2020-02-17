import { Op } from 'sequelize';
import models from '../../../../Database/models';
import Dates from '../Dates';
import { months } from '../../utils/general';

const { Claims, Staff, Branch } = models;

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

  static createdAtClause(year, month) {
    if (!month) {
      return {
        [Op.gte]: new Date(year, 0, 1),
        [Op.lte]: new Date(year, 11, 31)
      };
    }
    const monthIndex = months.indexOf(month);
    // claims created between the first and last day of the month
    return {
      [Op.gte]: new Date(year, monthIndex + 1, 1),
      [Op.lte]: new Date(year, monthIndex + 2, 0)
    }
  }

  static adminFetchClaimOptions(query, forExports) {
    let options = {
      include: [{
        model: Staff,
        as: 'claimer',
        include: ['branch', 'role', 'lineManager']
      }]
    };
    if (query) {
      const { year, status, month } = query;
      const limit = 10;
      const offset = ((query.page || 1) - 1) * limit;
      const where = { createdAt: GenericHelpers.createdAtClause(year, month) };

      if (query.requester) where.requester = query.requester;
      if (status) where.status = status;
      if (query.solId) {
        const branchWhere = { solId: query.solId };
        options.include[0].include[0] = {
          model: Branch,
          as: 'branch',
          where: branchWhere
        };

        // return only staff in the branch
        options.include[0].required = true;
      }
      options.where = where;

      if (!forExports) {
        options.limit = limit;
        options.offset = offset;
      }
    } else {
      options.where = {
        createdAt: { [Op.gte]: GenericHelpers.periodToFetch() }
      };
    }
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
