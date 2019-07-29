import EmailConstructor from '../EmailConstructor';
import { templateNames } from '../../utils/types';
import krypter from '../krypter';


class NotificationsHelpers {
  static staffEmailTemplateName(notificationType) {
    if (['Approved', 'Declined'].includes(notificationType)) {
      return templateNames[`lineManager${notificationType}`];
    }
    if (notificationType) return templateNames[notificationType];
    return templateNames.NewClaimStaff;
  }

  static createLineManagerEmailDetails(staff, notificationType) {
    const emailTemplateName = templateNames[notificationType];
    const id = staff.lineManagerId;
    const hashedToken = krypter.authenticationEncryption('lineManager', { id });

    return [hashedToken, emailTemplateName];
  }

  static createEmail(staff, emailTemplateName, hash) {
    const emailDetails = {
      ...staff,
      emailTemplateName,
      hash
    };
    return EmailConstructor.create(emailDetails);
  }

  static createMultipleEmails(reciepients, notificationType) {
    const template = NotificationsHelpers.staffEmailTemplateName(undefined, notificationType);
    return EmailConstructor.createForMany(reciepients, template);
  }
}

export default NotificationsHelpers;
