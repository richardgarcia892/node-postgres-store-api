const boom = require('@hapi/boom');

// Sequelize crea un nameSpace en el cual se encuentran todos los modelos
// Segun como fueron definidos al momento de configurarlo
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const users = await models.User.findAll()
    return users
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
