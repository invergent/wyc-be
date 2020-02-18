import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';
import StaffService from '../utilities/services/StaffService';

class ProfileUpdate {
  static async profileInfo(req) {
    const { currentStaff, currentAdmin, body } = req;
    const requester = currentStaff || currentAdmin;
    let staff;

    try {
      if (body.branchId) {
        body.canUpdateBranch = false;
        staff = await StaffService.findStaffByStaffIdOrEmail(requester.staffId, ['lineManager']);
      }

      const updated = await StaffService.updateStaffInfo(requester.staffId, body);

      if (body.branchId && (staff.lineManagerId !== body.lineManagerId)) {
        notifications.emit(eventNames.ChangedLineManager, [staff.toJSON()]);
      }
      
      return [updated ? 200 : 500, `Profile ${updated ? '' : 'not '}updated!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500PRFUPD'];
    }
  }
}

export default ProfileUpdate;
