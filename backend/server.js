require('dotenv').config()
const express = require('express')

const Product = require('./models/productModel')
const Brand = require('./models/brandModel')
const Department = require('./models/departmentModel')
const User = require('./models/userModel')
const Province = require('./models/provinceModel')
const Order = require('./models/orderModel')
const Transaction = require('./models/transactionModel')
const ShoppingCart = require('./models/shoppingCartModel')
const Admin = require('./models/adminModel')

const restrict = require('./middleware/authMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('...')
})


app.get(`${process.env.API_URI}/products`, async (req, res) => {
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

app.get(`${process.env.API_URI}/products/:id`, async (req, res) => {
    const product = await Product.getByID(req.params.id)
    res.json(product)
})

app.get(`${process.env.API_URI}/brands`, async (req, res) => {
    const brands = await Brand.getAll()
    res.json(brands)
})

app.get(`${process.env.API_URI}/brands/:id/products`, async (req, res) => {
    const products = await Product.getByBrandID(req.params.id)
    res.json(products)
})

app.get(`${process.env.API_URI}/brands/:id`, async (req, res) => {
    const brand = await Brand.getByID(req.params.id)
    res.json(brand)
})

app.get(`${process.env.API_URI}/departments`, async (req, res) => {
    const departments = await Department.getAll()
    const departmentsTree = Department.getTree(departments)
    res.json(departmentsTree)
})

app.get(`${process.env.API_URI}/departments/:id`, async (req, res) => {
    const department = await Department.getByID(req.params.id)
    res.json(department)
})

app.get(`${process.env.API_URI}/departments/:id/products`, async (req, res) => {
    const products = await Product.getByDepartmentID(req.params.id)
    res.json(products)
})

app.get(`${process.env.API_URI}/provinces`, async (req, res) => {
    const provinces = await Province.getAll()
    res.json(provinces)
})

// Get User
app.get(`${process.env.API_URI}/users`, restrict.user, async (req, res) => {
    try {
        const { password, ...user } = await User.getByID(req.body.accountsID)
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

//Update User
app.put(`${process.env.API_URI}/users`, restrict.user, async (req, res) => {
    try {
        const user = await User.update(req.body)
        res.json(user)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

//Create a new User
app.post(`${process.env.API_URI}/users`, async (req, res) => {
    try{
        const user = await User.getByEmail(req.body)
        if (user) {
            res.status(400).send({ error: 'User already exists' })
        }
    } catch (err){
        res.status(400).send({ error: err.message })
    }

    try {
        const {accountsID, token} = await User.store(req.body)
        const {password, ...user} = await User.getByID({ accountsID })
        res.json({user, token})

    } catch(err){
        res.status(400).send({ error: err.message })
    }
})

//LogIn a User
app.post(`${process.env.API_URI}/users/login`, async (req, res) => {
    try {
        const { user, token } = await User.login(req.body)
        res.json({ user, token })
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

// Get Completed Orders placed by LoggedIn User
app.get(`${process.env.API_URI}/user-orders`, restrict.user, async (req, res) => {
    try {
        const orders = await Order.getCreatedByUser(req.body.accountsID)
        res.json(orders)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

// Get Order placed by LoggedIn User 
app.get(`${process.env.API_URI}/user-orders/:id`, restrict.user, async (req, res) => {
    try {
        const order = await Order.getByID(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

// Get Completed Order Receipt
app.get(`${process.env.API_URI}/user-orders/:id/receipt`, restrict.user, async (req, res) => {
    try {
        const receipt = await Order.getReceipt(req.params.id, req.body)
        res.json(receipt)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

// Create a new Order
app.post(`${process.env.API_URI}/user-orders`, restrict.user, async (req, res) => {
    try {
        const orderID = await Order.store(req.body)

        console.log(orderID)
        await ShoppingCart.store({ ...req.body, orderID})

        const order = await Order.getByID(orderID)

        res.json(order)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

//Update Order with Payment
app.put(`${process.env.API_URI}/user-orders/:id/complete`, restrict.user, async (req, res) => {
    try {
        //
        // In Production app here should be requests to the Payment Providers for getting transaction details
        //
        const transactionId = await Transaction.store(req.params.id, req.body)
        if (!transactionId) {
            res.status(400).send({ error: 'Transaction has not been created' })
        }

        const completed = await Order.complete(req.params.id, req.body)
        if (!completed) {
            res.status(400).send({ error: 'The order was not completed' })
        }
 
        res.json(completed)

    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})


//Update Order Details
app.put(`${process.env.API_URI}/user-orders/:id`, restrict.user, async (req, res) => {
    try {
        const updated = await Order.update(req.params.id, req.body)
        if(!updated){
            res.status(400).send({ error: 'Order has not been updated' })
        }
        const order = await Order.getByID(req.params.id)
        res.json(order)

    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

//*************************************
// Admin Section
// Get user by Id
app.get(`${process.env.API_URI}/admins/users/:id`, restrict.admin, async (req, res) => {
    try {
        const user = await User.getByID(req.params.id)
        const users = [user]
        res.json(users)
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

// Get all users
app.get(`${process.env.API_URI}/admins/users`, restrict.admin, async (req, res) => {
    try {
        const users = await User.index()
        res.json(users)
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})


//LogIn an Admin
app.post(`${process.env.API_URI}/admins/login`, async (req, res) => {
    try {
        const { admin, token } = await Admin.login(req.body)
        res.json({ admin, token })
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

// Get the Admin
app.get(`${process.env.API_URI}/admins`, restrict.admin, async (req, res) => {
    try {
        const { password, ...admin } = await Admin.getByID(req.body)
        res.json(admin)
    } catch (err) {
        res.status(401).send({ error: err.message })
    }
})

//Update the Admin
app.put(`${process.env.API_URI}/admins`, restrict.admin, async (req, res) => {
    try {
        const { password, ...admin } = await Admin.update(req.body)
        res.json(admin)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

// Get All Orders
app.get(`${process.env.API_URI}/orders`, restrict.admin, async (req, res) => {
    try {
        const orders = await Order.getAll()
        res.json(orders)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))