const express = require('express')
const ProductsService = require('../services/products')
const validatorHandler = require('../middleware/validator.handler')
const { getProductSchema, createproductSchema, updatedProductSchema } = require('../schemas/product');

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => { // Listar todos
  const products = await service.find()
  res.json(products)
})

router.get('/filter', async (req, res) => {
  res.send('filtro')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => { // Buscar uno
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  validatorHandler(createproductSchema, 'body'),
  async (req, res, next) => { // Crear uno nuevo
    try {
      const { body } = req
      const newProduct = await service.create(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  })

router.put('/:id', async (req, res, next) => { // Cambiar completamente
  try {
    const { id } = req.params
    const { body } = req
    const updatedProduct = await service.update(id, body)
    res.status(200).json(updatedProduct)
  } catch (error) {
    next(error) // Continua al middleware
  }
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatedProductSchema, 'body'),
  async (req, res, next) => { // Cambiar un elemento
    try {
      const { id } = req.params
      const { body } = req
      const updatedProduct = await service.updateAttribute(id, body)
      res.status(200).json(updatedProduct)
    } catch (error) {
      next(error) // Continua al middleware
    }
  })

router.delete('/:id', async (req, res, next) => { // Borrar
  try {
    const { id } = req.params
    const message = await service.delete(id)
    res.status(200).json(message)
  } catch (error) {
    next(error) // Continua al middleware
  }
})


module.exports = router
