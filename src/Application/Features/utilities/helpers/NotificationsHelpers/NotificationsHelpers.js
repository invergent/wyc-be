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
    const { lineManager: { id, idNumber } } = staff;
    const emailTemplateName = templateNames[notificationType];
    const hashedToken = krypter.authenticationEncryption('lineManager', { id, idNumber });

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
    const template = NotificationsHelpers.staffEmailTemplateName(notificationType);
    return EmailConstructor.createForMany(reciepients, template);
  }
}

export default NotificationsHelpers;
