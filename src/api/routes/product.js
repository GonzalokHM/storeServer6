const { getAllProducts } = require('../controller/product')

const productsRoutes = require('express').Router()

productsRoutes.get('/', getAllProducts)

module.exports = productsRoutes