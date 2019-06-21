import models from '../../../../../Database/models';
import CompanyService from '../CompanyService';

describe('TenantService Unit tests', () => {
  it('should fetch PasswordResetRequest', async () => {
    const info = { name: 'Vic Lawrence', emailAddress: 'someEmail' };
    jest.spyOn(models.Company, 'findOne').mockResolvedValue(info);

    const companyInfo = await CompanyService.fetchInfo();

    expect(companyInfo.name).toBe(info.name);
    expect(companyInfo.emailAddress).toBe(info.emailAddress);
  });
});
