const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const routerApi = require('./routes')


const { logError, errorHandler, boomErrorHandled } = require('./middleware/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())

const corsWhitelist = ['http://localhost:8080', 'https://myapp.co']
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(corsOptions))

routerApi(app)

app.use(logError);
app.use(boomErrorHandled)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`App running on port ${port}`)
});
