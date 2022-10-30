import axios from 'axios';
import services from '../services';

class APISyncHandlers {
  static async updateStaffSupervisorOnAppraisal(data) {
    const { staffId, lineManagerId } = data;
    const url = {
      development: 'http://example.com:9001/v1/supervisor/update',
      cloud_test: 'https://appraisal-test.apis.whytecleon.ng/v1/supervisor/update',
      production: 'https://appraisal.apis.whytecleon.ng/v1/supervisor/update'
    }[process.env.PLATFORM_ENV];

    const lineManager = await services.LineManagerService.findLineManagerByPk(lineManagerId, ['supervisorBranch']);
    
    const payload = {
      secret: process.env.SECRET,
      staffId,
      supervisor: lineManager,
      branchName: lineManager.supervisorBranch.name
    };

    return axios.default.put(url, payload);
  }
}

export default APISyncHandlers;
