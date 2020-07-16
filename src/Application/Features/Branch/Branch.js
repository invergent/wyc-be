import services from '../utilities/services';
import { eventNames, activityNames } from '../utilities/utils/types';
import notifications from '../utilities/notifications';

const { StaffService, BranchService } = services;

class Branch {
  static async update(req) {
    const { currentStaff: { staffId }, body: { branchId } } = req;
    
    try {
      const branch = await BranchService.fetchBranchByPk(branchId);
      if (!branch) return [404, 'Branch does not exist.'];
    
      await StaffService.updateStaffInfo(staffId, { branchId });
      notifications.emit(eventNames.LogActivity, [activityNames.ChangeBranch, { staffId }, branch]);
      return [200, 'Branch updated successfully.', branch];
    } catch (e) {
      console.log(e);
      return [500, 'An error occured ERR500CNGBRH'];
    }
  }

  static async fetchBranches() {
    const branches = await BranchService.fetchBranches();
    return [200, 'Request successful!', branches];
  }
}

export default Branch;
