import services from '../utilities/services';
import { eventNames } from '../utilities/utils/types';
import notifications from '../utilities/notifications';

const { LineManagerService, StaffService } = services;

class LineManager {
  static async addOrChangeLineManager(req) {
    const { currentStaff: { staffId }, body: { idNumber } } = req;
    const lineManagerDetails = { ...req.body, email: `${idNumber}@firstbanknigeria.com` };
    
    try {
      const [lineManagerData, created] = await LineManagerService.findOrCreateLineManager(lineManagerDetails);
      const lineManager = lineManagerData.toJSON();
      const payload = { lineManagerId: lineManager.id, canUpdateLineManager: false };
      await StaffService.updateStaffInfo(staffId, payload);
    
      notifications.emit(
        eventNames.LogActivity, [`${created ? 'Added' : 'Updated'} lineManager`, { staffId }, lineManager]
      );
    
      return [
        created ? 201 : 200,
        `Line manager ${created ? 'added' : 'updated'} successfully.`,
        lineManager
      ];
    } catch (e) {
      console.log(e);
      return [500, 'An error occured ERR500CNGLNM'];
    }
  }

  static async fetchLineManagers() {
    const lineManagers = await LineManagerService.fetchLineManagers();
    return [200, 'Request successful!', lineManagers];
  }
}

export default LineManager;
