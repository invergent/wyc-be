import { Op } from 'sequelize';
import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Staff, Roles } = models;

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

  static fetchAdmins(excludeAuditor) {
    const options = {
      where: { staffId: { [Op.iLike]: 'Adm%' } },
      attributes: ['id', 'staffId', 'firstname', 'lastname', ['email', 'emailAddress'], 'image'],
      include: ['role']
    };

    if (excludeAuditor) {
      options.include = [{
        model: Roles,
        as: 'role',
        where: { name: { [Op.notILike]: '%Auditor%' } }
      }];
      options.raw = true;
      options.plain = false;
    }

    return Staff.findAll(options);
  }

  static fetchStaff(reqOptions) {
    const {
      attributes, limit, staffId, staffOnly
    } = reqOptions;
    const options = { attributes, limit: limit || 100000000, where: { staffId: {} } };

    if (staffId) options.where.staffId = { [Op.like]: `%${staffId}%` };
    if (staffOnly) options.where.staffId = { ...options.where.staffId, [Op.notLike]: 'ADM%' };

    return Staff.findAll(options);
  }

  static resetMultipleClaimsAuthorisations() {
    const options = { where: { extraMonthsPermitted: true } };
    return Staff.update({ extraMonthsPermitted: false, extraMonthsData: null }, options);
  }

  static async createSuperAdmin() {
    const role = await Roles.findOne({ where: { name: 'Super Admin' } });
    const superAdmin = {
      staffId: 'ADM0016',
      firstname: 'CSP',
      lastname: 'Admin',
      email: 'cspadmin@whytecleon.com',
      password: 'password',
      roleId: role.id
    };
    return Staff.findOrCreate({
      where: { email: superAdmin.email },
      defaults: superAdmin
    });
  }
}

export default StaffService;
