const express = require('express')
const productRouter = require('./products')
const categoriesRouter = require('./categories')
const usersRouter = require('./users')

function routerApi(app) {
  const router = express.Router()
  // Definimos un router maestro para la version de la API
  app.use('/api/v1', router)
  // Se definen las rutas posteriores a la ruta maestra
  router.use('/products', productRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', usersRouter)
}

module.exports = routerApi
