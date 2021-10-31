/* eslint-disable no-console */
const express = require('express')
const cors = require('cors')
const morgan = require('morgan') // Log de requests HTTP
const helmet = require('helmet') // Sanitizacion de headers

const { config } = require('./config/config') // Import Config
const routerApi = require('./routes') // API Routers
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler') // errors Middlewares

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())

const corsOptions = {
  origin: (origin, callback) => {
    if (config.corsWhitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(corsOptions))

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(config.port, () => {
  console.log(`App running on port ${config.port}`)
});
