import helpers from '../helpers';
import services from '../services';
import { templateNames } from '../utils/types';

const {
  Mailer, NotificationsHelpers, PasswordResetHelper, ClaimHelpers
} = helpers;
const { ClaimService, ClaimApprovalHistoryService } = services;

class EmailNotifications {
  static async sendNotificationEmail(staff, emailTemplateName, hashedToken) {
    const email = await NotificationsHelpers.createEmail(
      staff, emailTemplateName, hashedToken
    );
    return EmailNotifications.sender(email);
  }

  static async sendPasswordResetEmail(staff) {
    const { staffId } = staff;
    const passwordResetHash = PasswordResetHelper.createAndSaveResetHash(staffId);
    return EmailNotifications.sendNotificationEmail(staff, templateNames.Reset, passwordResetHash);
  }

  static sendLineManagerNotifications(staff) {
    const [hashedToken, emailTemplateName] = NotificationsHelpers
      .createLineManagerEmailDetails(staff);
    return EmailNotifications.sendNotificationEmail(staff, emailTemplateName, hashedToken);
  }

  static sendStaffNotifications(staff, notificationType) {
    const emailTemplateName = NotificationsHelpers.staffEmailTemplateName(notificationType);
    return EmailNotifications.sendNotificationEmail(staff, emailTemplateName);
  }

  static async sendNotificationEmailToMany(reciepients, notificationType) {
    const emails = await NotificationsHelpers.createMultipleEmails(
      reciepients, notificationType
    );
    return EmailNotifications.sender(emails);
  }

  static notifyLineManagerOfNewClaim(staff) {
    // if supervisor email address is set
    EmailNotifications.sendLineManagerNotifications(staff);
  }

  static notifyStaffOfClaimSubmission(staff) {
    EmailNotifications.sendStaffNotifications(staff);
  }

  static notifyStaffLineManagerApproved(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'Approved');
  }

  static notifyStaffLineManagerDeclined(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'Declined');
  }

  static notifyStaffCancelled(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'Cancelled');
  }

  static remindStaffOfPendingClaim(listOfStaff) {
    EmailNotifications.sendNotificationEmailToMany(listOfStaff, 'Reminder');
  }

  static async notifyStaffCompleted() {
    const completedClaimsWithStaff = await ClaimService.fetchCompletedClaim('Completed');
    const filteredListOfStaff = ClaimHelpers.filterCompletedClaims(completedClaimsWithStaff);
    EmailNotifications.sendNotificationEmailToMany(filteredListOfStaff, 'Completed');

    // update completed claim histories
    ClaimApprovalHistoryService.createApprovalHistoryOnCompletion(filteredListOfStaff);
  }

  static sender(emails) {
    const mailer = new Mailer();
    if (Array.isArray(emails)) return mailer.sendToMany(emails);
    return mailer.send(emails);
  }
}

export default EmailNotifications;
