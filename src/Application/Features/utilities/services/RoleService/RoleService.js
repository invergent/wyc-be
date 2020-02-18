import { Op } from 'sequelize';
import models from '../../../../Database/models';

class RoleService {
  static fetchRoles(adminsOnly) {
    const options = {
      where: {
        [Op.and]: [
          { name: { [Op.notILike]: '%Admin%' } },
          { name: { [Op.notILike]: '%Auditor%' } }
        ]
      }
    };
    if (adminsOnly) {
      options.where = {
        name: {
          [Op.iLike]: {
            [Op.any]: ['%Admin%', '%Auditor%']
          }
        }
      };
    }
    return models.Roles.findAll(options);
  }
}

export default RoleService;
