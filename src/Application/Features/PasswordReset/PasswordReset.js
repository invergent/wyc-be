import bcrypt from 'bcrypt';
import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames, activityNames } from '../utilities/utils/types';

const { krypter, PasswordResetHelper } = helpers;
const { StaffService } = services;

class PasswordReset {
  static async forgotPassword(req) {
    const { body: { staffId, email } } = req;
    const identifier = staffId ? staffId.toUpperCase() : email.toLowerCase();

    const staff = await StaffService.findStaffByStaffIdOrEmail(identifier);
    if (!staff) return [404, 'Staff does not exist'];

    notifications.emit(eventNames.ForgotPassword, [staff.toJSON()]);
    notifications.emit(eventNames.LogActivity, ['Requested forgot password', { staffId: staff.staffId }]);
    return [200, `We just sent an email to ${staff.email}`];
  }

  static confirmPasswordResetRequest(req) {
    const { hash } = req.query;
    const data = {};

    if (!hash) {
      return [403, 'Invalid reset link'];
    }

    try {
      const decrypted = krypter.decryptCryptrHash(hash);
      const [secret, staffId] = decrypted.split(' ');

      if (secret !== process.env.RESET_SECRET) {
        return [403, 'Decryption failed!'];
      }

      const hashedToken = krypter.authenticationEncryption('passwordReset', { staffId });
      data.hashedToken = hashedToken;
      return [200, 'Decryption successful!', data, 'passwordResetToken'];
    } catch (e) {
      console.log(e);
      return [500, 'Decryption unsuccessful!'];
    }
  }

  static async resetPassword(req) {
    const { currentReset: { staffId }, query: { hash }, body: { password } } = req;

    try {
      const [statusCode, message] = await PasswordResetHelper.findAndValidateResetRequest(staffId, hash);
      if (message !== 'valid') return [statusCode, message];

      const updated = await StaffService.updateStaffInfo(staffId, { password: bcrypt.hashSync(password, 8) });
      if (updated) notifications.emit(eventNames.LogActivity, [activityNames.PasswordReset, { staffId }]);

      return [updated ? 200 : 500, `Password reset ${updated ? '' : 'un'}successful!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occured ERR500PSWRST'];
    }
  }
}

export default PasswordReset;
