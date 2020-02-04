import { Op } from 'sequelize';
import models from '../../../../Database/models';

const { Activities, Staff } = models;

class ActivityService {
  static logActivity(activity, staffId) {
    return Activities.create({ activity, staffId });
  }

  static fetchActivities(staffId, limit) {
    const options = { where: { staffId }, order: [['createdAt', 'DESC']] };
    if (limit) options.limit = limit;
    return Activities.findAll(options);
  }

  static fetchLogOptions(query) {
    const { staffId, period, page } = query;
    const limit = 10;
    const offset = (page - 1) * limit;
    const where = {};
    const options = {
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      include: [{
        model: Staff,
        as: 'creator',
        attributes: ['firstname', 'lastname']
      }]
    };

    if (staffId) where.staffId = staffId;
    if (period) {
      const [minDate, maxDate] = period.split('_');
      where.createdAt = { [Op.gte]: minDate, [Op.lte]: maxDate };
    }

    if (Object.keys(where).length) options.where = where;

    return options;
  }

  static fetchLogs(query) {
    const options = this.fetchLogOptions(query);
    return Activities.findAll(options);
  }
}

export default ActivityService;
