const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(5).max(25)
const price = Joi.number().integer().min(1)
const description = Joi.string().min(10).max(250)
const image = Joi.string().uri()

const createproductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description
})

const updatedProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createproductSchema, updatedProductSchema, getProductSchema }
