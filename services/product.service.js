const faker = require('faker')
const boom = require('@hapi/boom')
const sequelize = require('../libs/sequelize')

class ProductsService {
  constructor() {
    this.products = [];
    this.generate()
    this.sequelize = sequelize
  }

  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
        isblock: faker.datatype.boolean()
      })
    }
  }

  async findProductIndex(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) { // no existe
      throw boom.notFound(`Product: ${id}, not fount`)
    }
    return index
  }

  isBlock(product) {
    if (product.isblock) {
      throw boom.conflict(`not allowed to see Product:${product.id}, details`)
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    const query = 'select * from tasks'
    const [data, metadata] = await this.sequelize.query(query)
    return { data, metadata }
  }

  async findOne(id) {
    const index = await this.findProductIndex(id)
    const product = this.products[index]
    this.isBlock(product)
    return product
  }

  async update(id, changes) {
    const index = await this.findProductIndex(id)
    const currentProduct = this.products[index]
    // La spread (...) operation permite persisitir lo que ya esta y posteriormente aplicar los cambios
    this.products[index] = {
      id: currentProduct.id,
      ...changes
    }
    return this.products[index]
  }

  async updateAttribute(id, changes) {
    const index = await this.findProductIndex(id)
    const currentProduct = this.products[index]
    // La spread (...) operation permite persisitir lo que ya esta y posteriormente aplicar los cambios
    this.products[index] = {
      ...currentProduct,
      ...changes
    }
    return this.products[index]
  }

  async delete(id) {
    const index = await this.findProductIndex(id)
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = ProductsService;
