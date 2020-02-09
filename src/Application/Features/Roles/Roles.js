import RoleService from "../utilities/services/RoleService";

class Roles {
  static async fetchRoles(req) {
    const { query: { adminsOnly } } = req;
    const roles = await RoleService.fetchRoles(adminsOnly);
    return [200, 'Request successful!', roles];
  }
}

export default Roles;