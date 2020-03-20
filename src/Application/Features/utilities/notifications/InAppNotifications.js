import services from '../services';
import { notificationActivities } from '../utils/general';
import { eventNames } from '../utils/types';
import pusher from './pusher';
import helpers from '../helpers';

const { ClaimHelpers } = helpers;
const { NotificationService, ClaimService } = services;
const { lineManagerApproved, lineManagerDeclined, EditRequested } = eventNames;

class InAppNotifications {
  static notifyStaffLineManagerApproved(staff, userId, claimId) {
    return InAppNotifications.recordAndNotifyStaff(staff, claimId, lineManagerApproved);
  }

  static notifyStaffLineManagerDeclined(staff, claimId) {
    return InAppNotifications.recordAndNotifyStaff(staff, claimId, lineManagerDeclined);
  }

  static notifyStaffEditRequest(staff, claimId) {
    return InAppNotifications.recordAndNotifyStaff(staff, claimId, EditRequested);
  }

  static notifyStaffCompleted() {
    return InAppNotifications.recordAndNotifyManyStaff();
  }

  static recordAndNotifyStaff(staff, claimId, eventType) {
    const type = eventType.includes('Declined') ? 'Declined' : 'Approved';
    const message = notificationActivities[eventType];
    
    pusher.trigger(`${staff.staffId}`, eventType, { message });

    const notification = {
      activity: message, type, userId: staff.id, claimId
    };
    return NotificationService.createNotification(notification);
  }

  static async recordAndNotifyManyStaff() {
    const completedClaimsWithStaff = await ClaimService.fetchPendingClaims('Completed');
    const filteredListOfStaff = ClaimHelpers.filterCompletedClaims(completedClaimsWithStaff);

    return filteredListOfStaff.forEach((staff) => {
      InAppNotifications.recordAndNotifyStaff(staff, staff.claimId, 'adminProcessed');
    });
  }
}

export default InAppNotifications;
