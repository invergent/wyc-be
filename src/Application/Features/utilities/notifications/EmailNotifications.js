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

  static sendLineManagerNotifications(staff, notificationType) {
    const [hashedToken, emailTemplateName] = NotificationsHelpers
      .createLineManagerEmailDetails(staff, notificationType);
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
    EmailNotifications.sendLineManagerNotifications(staff, 'NewClaimLineManager');
  }

  static notifyLineManagerOfUpdatedClaim(staff) {
    EmailNotifications.sendLineManagerNotifications(staff, 'UpdatedLineManager');
  }

  static notifyStaffUpdatedClaim(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'UpdatedStaff');
  }

  static notifyStaffOfClaimSubmission(staff) {
    EmailNotifications.sendStaffNotifications(staff);
  }

  static notifyStaffLineManagerApproved(staff, claim) {
    const { monthOfClaim, year, amount } = claim;
    const newStaff = {
      ...staff,
      monthOfClaim,
      year,
      amount
    };
    EmailNotifications.sendStaffNotifications(newStaff, 'Approved');
  }

  static notifyStaffLineManagerDeclined(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'Declined');
  }

  static notifyStaffCancelled(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'Cancelled');
  }

  static notifyStaffEditRequest(staff) {
    EmailNotifications.sendStaffNotifications(staff, 'EditRequested');
  }

  static remindStaffOfPendingClaim(listOfStaff) {
    EmailNotifications.sendNotificationEmailToMany(listOfStaff, 'Reminder');
  }

  static sendActivationEmail(listOfStaff) {
    EmailNotifications.sendNotificationEmailToMany(listOfStaff, 'Activation');
  }

  static sendWelcomeEmailToLineManagers(listOfLineManagers) {
    const newList = listOfLineManagers.map(lm => ({
      lineManager: { firstname: lm.firstname },
      email: lm.email
    }));
    EmailNotifications.sendNotificationEmailToMany(newList, 'WelcomeLineManager');
  }

  static sendCanUpdateBranchEmail(listOfStaff) {
    EmailNotifications.sendNotificationEmailToMany(listOfStaff, 'CanUpdateBranch');
  }

  static sendBranchUpdatePermissionRequest(listOfAdmins, staff) {
    const newList = listOfAdmins.map(admin => ({
      adminFirstName: admin.firstname,
      firstname: staff.firstname,
      lastname: staff.lastname,
      staffId: staff.staffId,
      email: admin.emailAddress
    }));
    EmailNotifications.sendNotificationEmailToMany(newList, 'RequestToUpdateBranch');
  }

  static notifyLineManagerOfChange(staff) {
    const templateName = 'Notify New Line Manager';
    return EmailNotifications.sendNotificationEmail(staff, templateName);
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
