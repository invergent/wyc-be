import { CronJob } from 'cron';
import services from '../utilities/services';
import ClaimHelpers from '../utilities/helpers/ClaimHelpers';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';
import Dates from '../utilities/helpers/Dates';

const { ClaimService, SettingService } = services;

const ScheduledJobs = {};

class Scheduler {
  static fetchSettings() {
    return SettingService.fetchSettings();
  }

  static async scheduleJobs() {
    const settings = await Scheduler.fetchSettings();
    const { emailSchedule, overtimeWindowStart, overtimeWindowEnd } = settings;
    
    Scheduler.scheduleAJob('emailSchedule', emailSchedule);
    Scheduler.scheduleAJob('overtimeWindowStart', overtimeWindowStart);
    Scheduler.scheduleAJob('overtimeWindowEnd', overtimeWindowEnd);
  }

  static async checkPendingClaims() {
    const pendingClaims = await ClaimService.fetchPendingClaims('Awaiting');
    if (pendingClaims.length) {
      Scheduler.triggerEmailNotification(pendingClaims);
    }
  }

  static triggerEmailNotification(staffWithPendingClaim) {
    const filteredStaff = ClaimHelpers.filterReminderPendingClaims(staffWithPendingClaim);
    notifications.emit(eventNames.Reminder, [filteredStaff]);
  }

  static updateCronJob(scheduleType, settings) {
    Scheduler.stopJobIfRunning(scheduleType);
    if (scheduleType === 'emailSchedule') {
      Scheduler.scheduleAJob(scheduleType, settings.emailSchedule);
    } else {
      Scheduler.scheduleAJob('overtimeWindowStart', settings.overtimeWindowStart);
      Scheduler.scheduleAJob('overtimeWindowEnd', settings.overtimeWindowEnd);
    }
  }

  static scheduleAJob(scheduleType, cronTime) {
    let job;

    if (scheduleType === 'emailSchedule') {
      job = new CronJob(cronTime, Scheduler.checkPendingClaims);
    } else {
      job = new CronJob(cronTime, SettingService.updateOvertimeWindow, [scheduleType]);
    }
    job.start();

    // store jobs for future reference
    ScheduledJobs[scheduleType] = job;
  }

  static stopJobIfRunning(scheduleType) {
    if (scheduleType === 'emailSchedule') {
      ScheduledJobs[scheduleType].stop();
    } else {
      ScheduledJobs.overtimeWindowStart.stop();
      ScheduledJobs.overtimeWindowEnd.stop();
    }
  }

  static async updateCompanyStatistics() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const { year, month } = Dates.getCurrentYearMonth();

    const claims = await ClaimService.fetchCompletedClaim();
    const statPayload = { [months[month]]: claims.length };
    
    if (month === 0) {
      // if it is a new year, create a new record
      statPayload.year = year;
      return ClaimService.createChartStatistics(statPayload);
    }
    return ClaimService.updateChartStatistics(year, statPayload);
  }

  static scheduleStatsUpdateJob() {
    // run statistics update by 2:00 on the 27th of every month
    const job = new CronJob('0 2 27 * *', Scheduler.updateCompanyStatistics);
    job.start();
  }
}

export default { Scheduler, ScheduledJobs };
