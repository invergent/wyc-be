import '@babel/polyfill';
import features from '../Features';
import Responder from './Responder';

const {
  Authorisation, Branch, LineManager, PasswordReset, ChangePassword, Claim,
  Export, Settings, Administration, Users, imageUpload, ProfileUpdate, Roles,
  Notifications, Holidays
} = features;

class Controller {
  static async authoriseStaff(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseStaff);
  }

  static async authoriseAdmin(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseAdmin);
  }

  static async authoriseLineManager(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseLineManager);
  }

  static async updateStaffBranch(req, res) {
    return Responder.respond(req, res, Branch.updateStaffBranch);
  }

  static async addOrChangeLineManager(req, res) {
    return Responder.respond(req, res, LineManager.addOrChangeLineManager);
  }

  static async forgotPassword(req, res) {
    return Responder.respond(req, res, PasswordReset.forgotPassword);
  }

  static async confirmPasswordResetRequest(req, res) {
    return Responder
      .respondWithCookie(req, res, PasswordReset.confirmPasswordResetRequest);
  }

  static async resetPassword(req, res) {
    return Responder.respond(req, res, PasswordReset.resetPassword);
  }

  static async changePassword(req, res) {
    return Responder.respond(req, res, ChangePassword.processPasswordUpdate);
  }

  static async createOvertimeClaim(req, res) {
    return Responder.respond(req, res, Claim.create);
  }

  static async updateOvertimeClaim(req, res) {
    return Responder.respond(req, res, Claim.updateOvertimeClaim);
  }

  static async pendingClaimsForlineManagers(req, res) {
    return Responder.respond(req, res, Claim.sendPendingClaimsTolineManager);
  }

  static async approveClaim(req, res) {
    return Responder.respond(req, res, Claim.approve);
  }

  static async declineClaim(req, res) {
    return Responder.respond(req, res, Claim.decline);
  }

  static async requestEdit(req, res) {
    return Responder.respond(req, res, Claim.requestEdit);
  }

  static async cancelClaim(req, res) {
    return Responder.respond(req, res, Claim.cancel);
  }

  static async submittedClaims(req, res) {
    return Responder.respond(req, res, Administration.submittedClaims);
  }

  static async fetchSingleClaim(req, res) {
    return Responder.respond(req, res, Administration.fetchSingleClaim);
  }

  static async chartStatistics(req, res) {
    return Responder.respond(req, res, Administration.chartStatistics);
  }

  static async exportDoc(req, res) {
    return Responder.download(req, res, Export.claimReport);
  }

  static async updateSchedules(req, res) {
    return Responder.respond(req, res, Settings.updateSchedules);
  }

  static async createStaff(req, res) {
    return Responder.respond(req, res, Administration.createStaff);
  }

  static async createSingleBranchOrStaff(req, res) {
    return Responder.respond(req, res, Administration.createSingleBranchOrStaff);
  }

  static async createBranches(req, res) {
    return Responder.respond(req, res, Administration.createBranches);
  }

  static async staffClaimStats(req, res) {
    return Responder.respond(req, res, Users.Staff.dashboardData);
  }

  static async staffActivities(req, res) {
    return Responder.respond(req, res, Users.Staff.activities);
  }

  static async staffProfileData(req, res) {
    return Responder.respond(req, res, Users.Staff.profileData);
  }

  static async staffClaimHistory(req, res) {
    return Responder.respond(req, res, Users.Staff.claimHistory);
  }

  static async uploadImage(req, res) {
    return Responder.respond(req, res, imageUpload);
  }

  static async updateProfileInfo(req, res) {
    return Responder.respond(req, res, ProfileUpdate.profileInfo);
  }

  static async fetchLineManagers(req, res) {
    return Responder.respond(req, res, LineManager.fetchLineManagers);
  }

  static async fetchBranches(req, res) {
    return Responder.respond(req, res, Branch.fetchBranches);
  }

  static async updateBranch(req, res) {
    return Responder.respond(req, res, Branch.updateBranch);
  }

  static async removeBranch(req, res) {
    return Responder.respond(req, res, Branch.removeBranch);
  }

  static async fetchRoles(req, res) {
    return Responder.respond(req, res, Roles.fetchRoles);
  }

  static async fetchNotifications(req, res) {
    return Responder.respond(req, res, Notifications.getNotifications);
  }

  static async fetchStaff(req, res) {
    return Responder.respond(req, res, Administration.fetchStaff);
  }

  static async fetchSingleStaff(req, res) {
    return Responder.respond(req, res, Administration.fetchSingleStaff);
  }

  static async createAdmin(req, res) {
    return Responder.respond(req, res, Administration.createAdmin);
  }

  static async createSingleSupervisor(req, res) {
    return Responder.respond(req, res, Administration.createSingleSupervisor);
  }

  static async createSupervisors(req, res) {
    return Responder.respond(req, res, Administration.createSupervisors);
  }

  static async removeSingleSupervisor(req, res) {
    return Responder.respond(req, res, Administration.removeSingleSupervisor);
  }

  static async removeSingleStaff(req, res) {
    return Responder.respond(req, res, Administration.removeSingleStaff);
  }

  static async markNotificationsAsReadAndViewed(req, res) {
    return Responder.respond(req, res, Notifications.markAsViewedAndRead);
  }

  static async companySettings(req, res) {
    return Responder.respond(req, res, Administration.fetchSettings);
  }

  static async authoriseMultipleClaimsApplication(req, res) {
    return Responder.respond(req, res, Administration.authoriseMultipleClaimsApplication);
  }

  static async resendLoginCredentials(req, res) {
    return Responder.respond(req, res, Administration.resendLoginCredentials);
  }

  static async requestBranchEdit(req, res) {
    return Responder.respond(req, res, Administration.requestBranchEdit);
  }

  static async authoriseBranchEdit(req, res) {
    return Responder.respond(req, res, Administration.authoriseBranchEdit);
  }

  static async addHoliday(req, res) {
    return Responder.respond(req, res, Holidays.add);
  }

  static async remove(req, res) {
    return Responder.respond(req, res, Holidays.remove);
  }

  static async fetchAllHolidays(req, res) {
    return Responder.respond(req, res, Holidays.getAll);
  }

  static async fetchLogs(req, res) {
    return Responder.respond(req, res, Administration.fetchLogs);
  }

  static async fetchAdmins(req, res) {
    return Responder.respond(req, res, Administration.fetchAdmins);
  }

  static async removeAdmin(req, res) {
    return Responder.respond(req, res, Administration.removeAdmin);
  }

  static async dashboardStats(req, res) {
    return Responder.respond(req, res, Administration.dashboardStats);
  }
}

export default Controller;
