require('dotenv').config()
const express = require('express')

const Product = require('./models/productModel')
const Brand = require('./models/brandModel')
const User = require('./models/userModel')

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

app.post('/api/v1/users/login', async (req, res) => {
    const { email, pass } = req.body
    const user = await User.login(email, pass)
    res.json({
        id: user.AccountsID,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email
    })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))


