import services from '../utilities/services';
import AuthorisationHelpers from '../utilities/helpers/AuthorisationHelpers';
import notifications from '../utilities/notifications';
import { eventNames, activityNames } from '../utilities/utils/types';

const { StaffService } = services;

class Authorisation {
  static async runAuthorisation(req) {
    const { body: { staffId, email, password }, path } = req;
    const identifier = staffId ? staffId.toUpperCase() : email.toLowerCase();
    const errorCode = path.includes('admin') ? 'ADMLGN' : 'STFLGN';
    const tokenType = path.includes('admin') ? 'adminToken' : 'staffToken';
    
    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(identifier, ['role']);
      if (!staff) return [404, 'Staff not found'];

      const [statusCode, message] = AuthorisationHelpers.comparePassword(password, staff);
      if (statusCode !== 200) return [statusCode, message];

      notifications.emit(eventNames.LogActivity, ['Logged in', staff.staffId]);

      return AuthorisationHelpers.createStaffToken(staff, tokenType);
    } catch (e) {
      console.log(e);
      return [500, `An error occurred ERR500${errorCode}.`];
    }
  }

  static async authoriseStaff(req) {
    return Authorisation.runAuthorisation(req, 'staffToken');
  }

  static authoriseAdmin(req) {
    return Authorisation.runAuthorisation(req, 'adminToken');
  }

  static authoriseLineManager(req) {
    const { lineManager } = req;
    try {
      return AuthorisationHelpers.createLineManagerToken(lineManager);
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500VFYMGR.'];
    }
  }
}

export default Authorisation;
