import ActivityService from '../services/ActivityService';

class ActivityLogger {
  static log(activity, identifier, data) {
    if (activity.includes('lineManager')) activity = ActivityLogger.refineChangeLineManagerLog(activity, data);
    if (activity.includes('{{branchName}}')) activity = ActivityLogger.refineChangeBranchLog(data, activity);
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

  static refineChangeBranchLog(data, activity) {
    const { name, solId } = data;
    return activity
      .replace(/{{branchName}}/g, name)
      .replace(/{{solId}}/g, solId);
  }
}

export default ActivityLogger;
