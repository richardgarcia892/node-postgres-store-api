const boom = require('@hapi/boom')

// Closure de Javascript que retorna un middleware dinamico para la validacion de esquemas
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property] // Property representa req.body, .params, o .query, dependiendo del argumento con el que se llama al middleware
    const { error } = schema.validate(data, { abortEarly: false }) // Joi AbortEarly: Manda todos los errores juntos y no solo el primero que se evaluo
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
