require('dotenv').config()
const express = require('express')

const Product = require('./models/productModel')
const Brand = require('./models/brandModel')

const app = express()


app.get('/', (req, res) => {
    res.send('...')
})

app.get('/api/v1/products', async (req, res) => {
    const products = await Product.getFeatured()
    res.json(products)
})

app.get('/api/v1/products/brands/:id', async (req, res) => {
    const products = await Product.getByBrandID(req.params.id)
    res.json(products)
})

app.get('/api/v1/products/:id', async (req, res) => {
    const product = await Product.getByID(req.params.id)
    res.json(product)
})

app.get('/api/v1/brands', async (req, res) => {
    const brands = await Brand.getAll()
    res.json(brands)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


