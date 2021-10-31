require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'DEV',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  corsWhitelist: ['http://localhost:8080', 'https://myapp.co']
}

module.exports = { config }
