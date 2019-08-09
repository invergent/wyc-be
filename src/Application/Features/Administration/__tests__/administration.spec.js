import Administration from '../Administration';
import helpers from '../../utilities/helpers';
import services from '../../utilities/services';
import { mockReq } from '../../../../__tests__/__mocks__';
import SettingService from '../../utilities/services/SettingService';

const { AdministrationHelpers } = helpers;
const { StaffService, ClaimService } = services;

describe('Administration Unit Tests', () => {
  afterEach(() => jest.resetAllMocks());

  describe('Create staff', () => {
    it('should catch errors if they occur while creating staff', async () => {
      jest.spyOn(AdministrationHelpers, 'convertStaffWorksheetToObjectsArray').mockReturnValue('value');
      jest.spyOn(StaffService, 'bulkCreateStaff').mockRejectedValue('value');

      const result = await Administration.createStaff(mockReq);

      expect(result[0]).toBe(500);
      expect(result).toHaveLength(3);
      expect(result[1]).toBe('There was an error creating staff ERR500CRTSTF.');
    });
  });

  describe('submittedClaims', () => {
    it('should send a 500 fail response if an error occurs while fetching chart statistics data.', async () => {
      jest.spyOn(AdministrationHelpers, 'getChartStatistics').mockRejectedValue('err');

      const result = await Administration.chartStatistics();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem fetching claims ERR500CHRTST.');
    });
  });

  describe('markClaimsAsCompleted', () => {
    it('should send a 500 fail response if an error occurs while marking claims.', async () => {
      jest.spyOn(ClaimService, 'markClaimsAsCompleted').mockRejectedValue('err');

      const result = await Administration.markClaimsAsCompleted();
      const message = 'An error occurred while marking claims as completed ERR500CLMMCC.';

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });
  });

  describe('fetch Tenant settings', () => {
    it('should send a 200 response on successful claim fetch.', async () => {
      jest.spyOn(SettingService, 'fetchSettings').mockResolvedValueOnce({});

      const result = await Administration.fetchSettings();
      const message = 'Request successful!';

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual(message);
    });

    it('should send a 500 fail response if an error occurs while fetching claims.', async () => {
      jest.spyOn(SettingService, 'fetchSettings').mockRejectedValueOnce('err');

      const result = await Administration.fetchSettings();
      const message = 'An error occurred while fetching settings.';

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });
  });
});
