import bcrypt from 'bcrypt';
import services from '../utilities/services';
import { eventNames, activityNames } from '../utilities/utils/types';
import notifications from '../utilities/notifications';

const { StaffService } = services;

class ChangePassword {
  static async processPasswordUpdate(req) {
    const { currentStaff, currentAdmin, body: { currentPassword, newPassword } } = req;
    const requester = currentStaff || currentAdmin;
    const updatePayload = {};

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(requester.staffId);
      const [isCorrect, firstLogin] = await ChangePassword
        .currentPasswordIsCorrect(currentPassword, staff.password);
      if (!isCorrect) return [401, 'Password is incorrect'];

      if (firstLogin) updatePayload.changedPassword = true;
      updatePayload.password = bcrypt.hashSync(newPassword, 8);

      const updated = await StaffService.updateStaffInfo(requester.staffId, updatePayload);

      if (updated) {
        notifications.emit(eventNames.LogActivity, [activityNames.ChangePassword, requester.staffId]);
      }

      return [updated ? 200 : 500, `Password ${updated ? '' : 'not '}changed!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500CHGPSW'];
    }
  }

  static currentPasswordIsCorrect(currentPasswordFromUser, currentPasswordFromDB) {
    if (currentPasswordFromUser === currentPasswordFromDB) {
      return [true, true];
    }
    return [bcrypt.compareSync(currentPasswordFromUser, currentPasswordFromDB)];
  }
}

export default ChangePassword;
