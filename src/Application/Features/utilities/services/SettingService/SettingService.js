import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Settings } = models;

class SettingService {
  static fetchSettings() {
    const options = { where: { id: 1 }, raw: true };
    return Settings.findOne(options);
  }

  static updateSettings(updatePayload) {
    return BasicQuerier.update('Settings', updatePayload, 1);
  }

  static async updateOvertimeWindow([scheduleType]) {
    const overtimeWindow = scheduleType.includes('Start') ? 'Open' : 'Close';
    return BasicQuerier.update('Settings', { overtimeWindow, overtimeWindowIsActive: false });
  }
}

export default SettingService;
