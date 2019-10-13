import { Op } from 'sequelize';
import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Staff } = models;

class StaffService {
  static async updateStaffInfo(staffId, payload) {
    const queryOptions = { where: { staffId }, returning: true };
    const [updated] = await Staff.update(payload, queryOptions);
    return !!updated;
  }

  static fetchStaffByPk(staffPk, includes, order) {
    return BasicQuerier.findByPk('Staff', staffPk, includes, order);
  }

  static findStaffByStaffIdOrEmail(identifier, includes) {
    const searchColumn = identifier.includes('.com') ? 'email' : 'staffId';
    const options = { where: { [searchColumn]: identifier } };

    if (includes && Array.isArray(includes)) options.include = includes;

    return Staff.findOne(options);
  }

  static bulkCreateStaff(listOfStaff) {
    return BasicQuerier.bulkCreate('Staff', listOfStaff);
  }

  static findOrCreateSingleStaff(staff) {
    return Staff.findOrCreate({
      where: { staffId: staff.staffId },
      defaults: staff,
      raw: true
    });
  }

  static fetchStaff(attributes) {
    const options = { where: { staffId: { [Op.notLike]: 'ADMIN%' } }, attributes };
    return Staff.findAll(options);
  }

  static resetMultipleClaimsAuthorisations() {
    const options = { where: { extraMonthsPermitted: true } };
    return Staff.update({ extraMonthsPermitted: false, extraMonthsData: null }, options);
  }
}

export default StaffService;
