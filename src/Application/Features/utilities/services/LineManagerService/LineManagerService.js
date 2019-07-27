import models from '../../../../Database/models';

const { LineManagers } = models;

class LineManagerService {
  static findOrCreateLineManager(lineManagerDetails) {
    const { email } = lineManagerDetails;
    return LineManagers.findOrCreate({
      where: { email },
      defaults: lineManagerDetails
    });
  }

  static fetchLineManagers() {
    return LineManagers.findAll({ include: ['designation'] });
  }

  static findLineManagerByPk(id) {
    return LineManagers.findByPk(id);
  }
}

export default LineManagerService;
