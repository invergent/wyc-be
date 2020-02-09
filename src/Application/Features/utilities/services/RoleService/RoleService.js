import { Op } from 'sequelize';
import models from '../../../../Database/models';

class RoleService {
  static fetchRoles(adminsOnly) {
    const options = { where: { name: { [Op.notILike]: '%ADMIN%' } } };
    if (adminsOnly) options.where.name = { [Op.iLike]: { [Op.any]: ['%ADMIN%', '%Auditor%'] } };
    return models.Roles.findAll(options);
  }
}

export default RoleService;
