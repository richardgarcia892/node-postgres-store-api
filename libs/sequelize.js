const { Sequelize } = require('sequelize')

const { config } = require('../config/config')
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, { dialect: 'postgres', logging: true })

setupModels(sequelize) // Realiza la configuracion inicial del modelo, se le envia la conexion para este proposito

sequelize.sync() // Crea la estructura en la BD que se definio en el modelo con los Schemas

module.exports = sequelize
