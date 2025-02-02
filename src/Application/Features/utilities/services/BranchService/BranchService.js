import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';


class BranchService {
  static fetchBranchByPk(branchId) {
    return BasicQuerier.findByPk('Branch', branchId);
  }

  static bulkCreateBranches(listOfBranches) {
    return BasicQuerier.bulkCreate('Branch', listOfBranches);
  }

  static fetchBranches() {
    return BasicQuerier.findAll('Branch', { include: 'supervisors' });
  }

  static updateBranch(payload, branchId) {
    return BasicQuerier.update('Branch', payload, branchId);
  }

  static findOrCreateSingleBranch(branch) {
    return models.Branch.findOrCreate({
      where: { solId: branch.solId },
      defaults: branch,
      raw: true
    });
  }
}

export default BranchService;
