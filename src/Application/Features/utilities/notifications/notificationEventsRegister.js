import notify from './Notifier';
import { eventNames } from '../utils/types';
import EmailNotifications from './EmailNotifications';
import InAppNotifications from './InAppNotifications';
import ActivityLogger from './ActivityLogger';

notify.register(eventNames.Activation, EmailNotifications.sendActivationEmail);

notify.register(eventNames.ForgotPassword, EmailNotifications.sendPasswordResetEmail);

notify.register(eventNames.NewClaim, EmailNotifications.notifyLineManagerOfNewClaim);
notify.register(eventNames.NewClaim, EmailNotifications.notifyStaffOfClaimSubmission);
notify.register(eventNames.NewClaim, ActivityLogger.logClaimActivity);

notify.register(eventNames.EditRequested, EmailNotifications.notifyStaffEditRequest);
notify.register(eventNames.EditRequested, InAppNotifications.notifyStaffEditRequest);

notify.register(eventNames.Updated, EmailNotifications.notifyLineManagerOfUpdatedClaim);
notify.register(eventNames.Updated, ActivityLogger.logClaimActivity);

notify.register(eventNames.lineManagerApproved, EmailNotifications.notifyStaffLineManagerApproved);
notify.register(eventNames.lineManagerApproved, InAppNotifications.notifyStaffLineManagerApproved);

notify.register(eventNames.lineManagerDeclined, EmailNotifications.notifyStaffLineManagerDeclined);
notify.register(eventNames.lineManagerDeclined, InAppNotifications.notifyStaffLineManagerDeclined);

notify.register(eventNames.Cancelled, EmailNotifications.notifyStaffCancelled);
notify.register(eventNames.Cancelled, ActivityLogger.logClaimActivity);

notify.register(eventNames.Completed, EmailNotifications.notifyStaffCompleted);
notify.register(eventNames.Completed, InAppNotifications.notifyStaffCompleted);

notify.register(eventNames.Reminder, EmailNotifications.remindStaffOfPendingClaim);

// Activity logger events
notify.register(eventNames.LogActivity, ActivityLogger.log);

export default notify;
