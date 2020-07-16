import ActivityService from '../services/ActivityService';

class ActivityLogger {
  static log(activity, identifier, data) {
    if (activity.includes('lineManager')) activity = ActivityLogger.refineChangeLineManagerLog(activity, data);
    if (activity.includes('{{branchName}}')) activity = ActivityLogger.refineChangeBranchLog(data);
    return ActivityService.logActivity(activity, identifier);
  }

  static logClaimActivity(staff, claimId, activity) {
    return ActivityLogger.log(activity, { staffId: staff.staffId });
  }

  static refineChangeLineManagerLog(activity, data) {
    const { firstname: fs, lastname: ls } = data;
    if (activity.includes('Added')) return `Added ${fs} ${ls} as line manager`;
    return `Changed line manager to ${fs} ${ls}`;
  }

  static refineChangeBranchLog(data) {
    return `Updated branch to ${data.name}`;
  }
}

export default ActivityLogger;
