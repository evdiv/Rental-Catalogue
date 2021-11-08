require('dotenv').config()
const express = require('express')

const Product = require('./models/productModel')
const Brand = require('./models/brandModel')
const User = require('./models/userModel')

const restrict = require('./middleware/authMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('...')
})

app.get('/api/v1/products', async (req, res) => {
    let products = []
    switch (req.query.type) {
        case 'featured':
            products = await Product.getFeatured()
            break;
        case 'onsale': 
            products = await Product.getOnSale()
            break;
        default:
            products = await Product.getAll()
    }
    
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

app.get('/api/v1/users', restrict, async (req, res) => {
    try {
        const user = await User.getByID(req.body)
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

app.patch('/api/v1/users', restrict, async (req, res) => {
    try {
        const user = await User.update(req.body)
        res.json(user)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

app.post('/api/v1/users', async (req, res) => {
    try{
        const user = await User.getByEmail(req.body)
        if (user) {
            res.status(400).send({ error: 'User already exists' })
        }
    } catch (err){
        res.status(400).send({ error: err.message })
    }

    try {
        const accountsID = await User.store(req.body)
        const user = await User.getByID({ accountsID })
        res.json(user)
    } catch(err){
        res.status(400).send({ error: err.message })
    }
})

app.post('/api/v1/users/login', async (req, res) => {
    try {
        const user = await User.login(req.body)
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


