import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { LineManagers } = models;

class LineManagerService {
  static findOrCreateLineManager(lineManagerDetails) {
    const { idNumber } = lineManagerDetails;
    return LineManagers.findOrCreate({
      where: { idNumber },
      defaults: lineManagerDetails
    });
  }

  static fetchLineManagers() {
    return LineManagers.findAll();
  }

  static findLineManagerByPk(id, include) {
    const queryOptions = {};
    if (include) queryOptions.include = include;
    return LineManagers.findByPk(id, queryOptions);
  }

  static updateLineManager(payload) {
    return LineManagers.update(payload, { where: { idNumber: payload.idNumber }, returning: true });
  }

  static bulkCreateLineManagers(lineManagers) {
    return BasicQuerier.bulkCreate('LineManagers', lineManagers);
  }
}

export default LineManagerService;
