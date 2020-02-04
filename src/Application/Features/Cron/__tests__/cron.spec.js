import Cron from '../Scheduler';
import services from '../../utilities/services';
import ClaimHelpers from '../../utilities/helpers/ClaimHelpers';
import notifications from '../../utilities/notifications';
import { eventNames } from '../../utilities/utils/types';
import {
  mockSettings, mockStaffWithPendingClaims, mockFilteredStaffWithPendingClaims
} from '../../../../__tests__/__mocks__';
import Dates from '../../utilities/helpers/Dates';

const { Scheduler } = Cron;
const { ClaimService, SettingService } = services;

describe('Cron Unit Tests', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should call SettingService fetchSettings method', () => {
    const fetchSettings = jest.spyOn(SettingService, 'fetchSettings').mockImplementation(() => {});

    Scheduler.fetchSettings();

    expect(fetchSettings).toHaveBeenCalled();
  });

  it('should check if pending claims exists', async () => {
    jest.spyOn(ClaimService, 'fetchPendingClaims').mockResolvedValue([]);

    const result = await Scheduler.checkPendingClaims();

    expect(result).toBe(undefined);
  });

  it('should emit a Reminder event', () => {
    const emitFunction = jest.spyOn(notifications, 'emit').mockImplementation(() => {});
    jest.spyOn(ClaimHelpers, 'filterReminderPendingClaims').mockReturnValue(mockFilteredStaffWithPendingClaims);

    Scheduler.triggerEmailNotification('staffWithPendingClaim');

    expect(emitFunction).toHaveBeenCalledWith(eventNames.Reminder, [mockFilteredStaffWithPendingClaims]);
  });

  it('should check and trigger email notification function if pending claims exists', async () => {
    const triggerEmailNotification = jest.spyOn(Scheduler, 'triggerEmailNotification').mockImplementation(() => {});
    jest.spyOn(ClaimService, 'fetchPendingClaims').mockResolvedValue(mockStaffWithPendingClaims);

    await Scheduler.checkPendingClaims();

    expect(triggerEmailNotification).toHaveBeenCalledWith(mockStaffWithPendingClaims);
  });

  it('should scheduleJobs based on schedule received from SettingService', async () => {
    const scheduleAJobFn = jest.spyOn(Scheduler, 'scheduleAJob').mockImplementation(() => {});
    jest.spyOn(Scheduler, 'fetchSettings').mockResolvedValue(mockSettings);

    await Scheduler.scheduleJobs();

    expect(scheduleAJobFn).toHaveBeenCalledTimes(3);
  });

  it('should schedule a job for running and saving claim analytics on the DB[update].', async () => {
    const claimservice = jest.spyOn(ClaimService, 'fetchCompletedClaim').mockReturnValue([{}]);
    const updateStat = jest.spyOn(ClaimService, 'updateChartStatistics').mockReturnValue([{}]);

    await Scheduler.updateCompanyStatistics();
    const { month } = Dates.getLastMonthYearAndMonth();
    if (month) {
      expect(updateStat).toHaveBeenCalled();
    } else {
      expect(claimservice).toHaveBeenCalled();
    }
  });

  it('should schedule a job for running and saving claim analytics on the DB[create].', async () => {
    const claimservice = jest.spyOn(ClaimService, 'fetchCompletedClaim').mockReturnValue([{}]);
    const createStat = jest.spyOn(ClaimService, 'createChartStatistics').mockReturnValue([{}]);
    const dates = jest.spyOn(Dates, 'getLastMonthYearAndMonth').mockReturnValue({ year: 'year', month: 0 });

    await Scheduler.updateCompanyStatistics();

    expect(claimservice).toHaveBeenCalled();
    expect(createStat).toHaveBeenCalled();
    expect(dates).toHaveBeenCalled();
  });
});
