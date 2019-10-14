import models from '../../../../Database/models';

class BasicQuerier {
  static findByPk(model, pk, includes, order) {
    const options = {};
    if (includes) options.include = includes;
    if (order) options.order = order;
    return models[model].findByPk(pk, options);
  }

  static passwordResetQueries(method, staffId, data) {
    let options = { where: { staffId }, raw: true };
    if (method === 'destroy') options.returning = true;
    if (data) options = data;
    return models.PasswordResetRequest[method](options);
  }

  static update(model, updatePayload, id) {
    const options = { where: {}, returning: true, raw: true };
    if (id) options.where.id = id;
    return models[model].update(updatePayload, options);
  }

  static bulkCreate(model, list) {
    const options = { returning: true, raw: true, plain: false };
    return models.sequelize.transaction(transaction => models[model]
      .bulkCreate(list, options, { transaction }));
  }

  static findAll(model, options) {
    return models[model].findAll(options);
  }
}

export default BasicQuerier;
