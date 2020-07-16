import services from '../utilities/services';
import Cron from '../Cron';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';

const { SettingService } = services;

class Settings {
  static async updateSchedules(req) {
    const { body, currentAdmin: { staffId } } = req;
    const scheduleType = body.emailSchedule ? 'emailSchedule' : 'overtimeWindowSchedule';
    const updateCron = !body.overtimeWindowIsActive;

    try {
      const [updated, settings] = await SettingService.updateSettings(body);
      if (updated && updateCron) Cron.Scheduler.updateCronJob(scheduleType, settings[0]);

      if (updated) {
        notifications.emit(eventNames.LogActivity, ['Updated settings', { staffId }]);
        return [200, 'Update successful', settings[0]];
      }
      return [500, 'Schedule was not updated.'];
    } catch (e) {
      console.log(e);
      return [500, 'There was an error updating your schedule ERR500UPDSCH.'];
    }
  }
}

export default Settings;
