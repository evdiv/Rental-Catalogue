const express = require('express')
const products = require('./data/products-static-data')

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


app.listen(5000, console.log('Server is running on port 5000'))