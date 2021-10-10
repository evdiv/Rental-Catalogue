require('dotenv').config()
const express = require('express')

const Product = require('./models/productModel')

Product.getByID(30)
Product.getFeatured()

const app = express()


app.get('/', (req, res) => {
    res.send('...')
})

app.get('/api/v1/products', (req, res) => {
    res.json(products)
})

app.get('/api/v1/products/:id', (req, res) => {
    const product = products.find(p => {
        return p._id === req.params.id
    })
    res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


