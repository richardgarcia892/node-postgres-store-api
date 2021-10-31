const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const routerApi = require('./routes');


const { logError, errorHandler, boomErrorHandled } = require('./middleware/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const corsWhitelist = ['http://localhost:8080', 'https://myapp.co'];
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(corsOptions));
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logError);
app.use(boomErrorHandled);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' + port);
});
