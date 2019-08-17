import Claim from '../Claim';
import ClaimService from '../../utilities/services/ClaimService';
import StaffService from '../../utilities/services/StaffService';
import { companyInfo } from '../../utilities/utils/general';
import { mockReq } from '../../../../__tests__/__mocks__';

jest.mock('@sendgrid/mail');

describe('Claim Unit Test', () => {
  companyInfo.emailAddress = 'someEmailAddress';
  describe('create claim', () => {
    it('should send a 500 response if an error occurs while creating claim.', async () => {
      jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockRejectedValue('err');

      const result = await Claim.create(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem submitting your request ERR500CLMCRT');
    });
  });

  describe('runClaimApproval', () => {
    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(Claim, 'checkThatClaimIsAssignedToLineManager').mockResolvedValue([200, 'okay']);
      jest.spyOn(ClaimService, 'approveClaim').mockResolvedValue([false, {}]);

      const result = await Claim.runClaimApproval(mockReq, 'Approved');

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Claim not approved.');
    });
  });

  describe('cancelClaim', () => {
    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(ClaimService, 'cancelClaim').mockResolvedValue([false, {}]);

      const result = await Claim.cancel(mockReq);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Claim not cancelled.');
    });

    it('should send a 500 fail response if an error occurs while cancelling claim.', async () => {
      jest.spyOn(ClaimService, 'cancelClaim').mockRejectedValue('err');

      const result = await Claim.cancel(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem cancelling your claim ERR500CLMCNL.');
    });
  });

  describe('Request edit', () => {
    it('should send a not-requested message if edit request was not updated on the DB.', async () => {
      jest.spyOn(ClaimService, 'findClaimByPk').mockResolvedValue({});
      jest.spyOn(ClaimService, 'updateClaim').mockResolvedValue([false, {}]);

      const result = await Claim.requestEdit(mockReq);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Edit not requested.');
    });

    it('should send a 500 fail response if an error occurs while requesting edit.', async () => {
      jest.spyOn(ClaimService, 'updateClaim').mockRejectedValue('err');

      const result = await Claim.requestEdit(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem requesting edit ERR500EDTREQ.');
    });
  });

  describe('updateClaim', () => {
    it('should send a non-updated message if update was not executed on the DB.', async () => {
      jest.spyOn(ClaimService, 'updateClaim').mockResolvedValue([false, {}]);

      const result = await Claim.updateOvertimeClaim(mockReq);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Claim not updated.');
    });

    it('should send a 500 fail response if an error occurs while updating claim.', async () => {
      jest.spyOn(ClaimService, 'updateClaim').mockRejectedValue('err');

      const result = await Claim.updateOvertimeClaim(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem updating your claim ERR500UPDCLM.');
    });
  });
});
