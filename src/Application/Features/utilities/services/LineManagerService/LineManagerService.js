import models from '../../../../Database/models';

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

  static findLineManagerByPk(id) {
    return LineManagers.findByPk(id);
  }
}

export default LineManagerService;
