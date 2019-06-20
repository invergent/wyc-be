import models from '../../../../Database/models';
import { companyInfo } from '../../utils/general';

const { Company } = models;

class CompanyService {
  static async fetchInfo() {
    const info = await Company.findOne({ where: { id: 1 }, raw: true });
    companyInfo.name = info.name;
    companyInfo.emailAddress = info.emailAddress;
    return companyInfo;
  }
}

export default CompanyService;
