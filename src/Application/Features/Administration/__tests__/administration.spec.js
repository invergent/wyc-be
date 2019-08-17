import Administration from '../Administration';
import helpers from '../../utilities/helpers';
import services from '../../utilities/services';
import { mockReq } from '../../../../__tests__/__mocks__';
import SettingService from '../../utilities/services/SettingService';

const { AdministrationHelpers } = helpers;
const { StaffService, ClaimService } = services;

describe('Administration Unit Tests', () => {
  afterEach(() => jest.resetAllMocks());

  describe('Staff management', () => {
    it('should catch errors if they occur while creating staff', async () => {
      jest.spyOn(AdministrationHelpers, 'convertStaffWorksheetToObjectsArray').mockReturnValue('value');
      jest.spyOn(StaffService, 'bulkCreateStaff').mockRejectedValue('value');

      const result = await Administration.createStaff(mockReq);

      expect(result[0]).toBe(500);
      expect(result).toHaveLength(3);
      expect(result[1]).toBe('There was an error creating staff ERR500CRTSTF.');
    });

    it('should send a 500 fail response if an error occurs while fetching all staff.', async () => {
      jest.spyOn(AdministrationHelpers, 'fetchStaff').mockRejectedValue('value');
      
      const result = await Administration.fetchStaff();
      const message = 'There was a problem fetching claims ERR500FETSTF.';

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });

    it('should send a 500 fail response if an error occurs while fetching single staff.', async () => {
      jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockRejectedValue('value');

      const result = await Administration.fetchSingleStaff({ params: { staffId: 'someId' } });
      const message = 'There was a problem fetching claims ERR500FETSTF.';

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });

    it('should send a 500 fail response if an error occurs while creating single staff or branch.', async () => {
      jest.spyOn(StaffService, 'findOrCreateSingleStaff').mockRejectedValue('value');

      const result = await Administration.createSingleBranchOrStaff({ body: {}, path: 'staff' });
      const message = 'There was an error while creating resource.';

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });
  });

  describe('Statistics and submitted claims', () => {
    it('should send a 500 fail response if an error occurs while fetching submitted claims.', async () => {
      jest.spyOn(ClaimService, 'fetchSubmittedClaims').mockRejectedValue('err');

      const result = await Administration.submittedClaims();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem fetching claims ERR500ADMDSH.');
    });

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

    it('should send a 500 fail response if an error occurs while fetching settings.', async () => {
      jest.spyOn(SettingService, 'fetchSettings').mockRejectedValueOnce('err');

      const result = await Administration.fetchSettings();
      const message = 'An error occurred while fetching settings.';

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });
  });

  describe('Claim management', () => {
    it('should send a 500 fail response if an error occurs while fetching single claim.', async () => {
      jest.spyOn(ClaimService, 'findClaimByPk').mockRejectedValueOnce('err');

      const result = await Administration.fetchSingleClaim({ params: { claimId: 'someId' } });
      const message = 'There was a problem fetching claims ERR500FETSCM.';

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual(message);
    });
  });
});
