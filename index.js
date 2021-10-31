const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { logError, errorHandler, boomErrorHandled } = require('./middleware/error.handler')

const app = express()
const port = process.env.PORT || 3000;

// Configuracion de CORS
const corsWhiteList = ['http://localhost:8080']
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.includes(origin) || !origin) {
      callback(null, true)
    } else { callback(new Error('no permitido')) }
  }
}

app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json()) // Permite recibir los request JSON en POST

routerApi(app)

app.use(logError)
app.use(boomErrorHandled)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`App running on port ${port}`)
)
