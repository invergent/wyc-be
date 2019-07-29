import models from '../../Database/models';

class Holidays {
  static async add(req) {
    const { body } = req;

    try {
      const [holiday, created] = await models.Holidays.findOrCreate({
        where: { day: body.day },
        defaults: body
      });
      return created ? [201, 'Holiday created!', holiday] : [409, 'Holiday already exists', holiday];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem creating holiday ERR500HOLCRT'];
    }
  }

  static async update(req) {
    const { params: { holidayId }, body } = req;

    try {
      const [updated] = await models.Holidays.update(body, { where: { id: holidayId } });
      return [200, `Holiday${updated ? '' : ' not'} updated.`];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem updating holiday ERR500HOLUPD'];
    }
  }

  static async delete(req) {
    const { params: { holidayId } } = req;

    try {
      const holiday = await models.Holidays.findByPk(holidayId);
      if (!holiday) return [200, 'Holiday not found.'];
      holiday.destroy();

      return [200, 'Holiday removed.'];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem removing holiday ERR500HOLDEL'];
    }
  }

  static async getAll() {
    try {
      const holidays = await models.Holidays.findAll();
      return [200, `Found ${holidays.length} holidays`, holidays];
    } catch (error) {
      console.log(error);
      return [500, 'There was a problem fetching holidays ERR500HOLGET'];
    }
  }
}

export default Holidays;
