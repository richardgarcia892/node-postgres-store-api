/* eslint-disable no-unused-vars */
function logError(err, req, res, next) {
  console.log({ error: { message: err.message, stack: err.stack } })
  next(err)
}
function errorHandler(err, req, res, next) {
  console.log('errorHandler')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandled(err, req, res, next) {
  if (err.isBoom) { // Identifica que es un error tipo Boom
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err) // Si no es un error tipo boom, continua al errorHandler "normal"
  }
}

module.exports = { logError, errorHandler, boomErrorHandled }
