import { Op } from 'sequelize';
import models from '../../../../Database/models';

const { Activities, Staff, LineManagers } = models;

class ActivityService {
  static logActivity(activity, identifier) {
    return Activities.create({ activity, ...identifier });
  }

  static fetchActivities(staffId, limit) {
    const options = { where: { staffId }, order: [['createdAt', 'DESC']] };
    if (limit) options.limit = limit;
    return Activities.findAll(options);
  }

  static fetchLogOptions(query) {
    const { staffId, period, page, exportable } = query;
    const where = {};
    const options = {
      order: [['createdAt', 'DESC']],
      include: [{
        model: Staff,
        as: 'creator',
        attributes: ['firstname', 'lastname']
      },
      {
        model: LineManagers,
        as: 'sCreator',
        attributes: ['firstname', 'lastname']
      }]
    };

    if (staffId) where.staffId = staffId;
    if (period) {
      const [minDate, maxDate] = period.split('_');
      where.createdAt = { [Op.gte]: minDate, [Op.lte]: maxDate };
    }
    if (!exportable) {
      options.limit = 10;
      options.offset = (page - 1) * 10;
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
