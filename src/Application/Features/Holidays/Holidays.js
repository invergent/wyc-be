import models from '../../Database/models';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';

class Holidays {
  static async add(req) {
    const { body: { fullDate }, currentAdmin: { staffId } } = req;

    try {
      const [holiday, created] = await models.Holidays.findOrCreate({
        where: { fullDate },
        defaults: req.body
      });
      if (created) {
        notifications.emit(eventNames.LogActivity, [`Added ${fullDate} as holiday`, staffId]);
        return [201, 'Holiday added!', holiday];
      }
      return [409, 'Holiday already exists', holiday];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem creating holiday ERR500HOLCRT'];
    }
  }

  static async remove(req) {
    const { query: { fullDate }, currentAdmin: { staffId } } = req;

    if (!fullDate) return [400, 'query params missing or invalid'];

    try {
      const holiday = await models.Holidays.findOne({ where: { fullDate } });
      if (!holiday) return [200, 'Holiday not found.'];
      
      await holiday.destroy();
      notifications.emit(eventNames.LogActivity, [`Removed ${fullDate} as holiday`, staffId]);
      return [200, 'Holiday removed!'];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem updating holiday ERR500HOLDEL'];
    }
  }

  static async getAll(req) {
    const { query: { yearMonth } } = req;
    const queryOptions = {};
    if (yearMonth) queryOptions.where = { yearMonth };
    try {
      const holidays = await models.Holidays.findAll(queryOptions);
      return [200, `Found ${holidays.length} holidays`, holidays];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem fetching holidays ERR500HOLGET'];
    }
  }
}

export default Holidays;
