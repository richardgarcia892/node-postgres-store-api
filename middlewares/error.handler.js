/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
function logErrors(err, req, res, next) {
  console.error(err); // genera log del error, podria emplearse para enviarlos a un sistema de tracking
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({ // Devuelve el error al usuario, para casos no manejados con Boom
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) { // Identifica si es un error Tipo Boom
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else { // Sino, continua a los errores genericos
    next(err);
  }
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
