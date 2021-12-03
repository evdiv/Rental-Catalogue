const execute = require('../db')
const Shipping = require('./shippingModel')

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM orders WHERE active = 1 AND ordersID = ?';
    const params = [id]
    const rows = await execute(sql, params)
    return rows[0]
}

const store = async (reqBody) => {
    const errors = validate(reqBody, 'products')
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const shippingCost = Shipping.getCost(reqBody)

    console.log('Shipping cost shippingCost' + shippingCost)
    const totalProductsPrice = reqBody.cartProducts.reduce((total, p) => { total + (p.product.rentalRate * p.days * p.qty)}, 0)
    
    console.log(shippingCost)
    console.log(totalProductsPrice)
    
    return 8989898;
}

const update = async (reqBody) => {

}

const getTaxes = async ({ accountsID, totalCost}) => {
    const errors = validate({ accountsID, totalCost }, 'taxes')
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }
    const sql = `SELECT p.PST, p.GST, p.HST, p.QST FROM provinces AS p, accounts AS a
                    WHERE a.provincesID = p.provincesId
                    AND a.accountsID = ?`;

    const params = [reqBody.accountsID]
    const rows = await execute(sql, params)

    const taxes = {
        'PST': rows[0].PST * totalCost,
        'GST': rows[0].GST * totalCost,
        'HST': rows[0].HST * totalCost,
        'QST': rows[0].QST * totalCost
    }
    return taxes
}

const validate = ({ accountsID, totalCost, cartProducts }, action) => {
    const errors = []
    if (!accountsID && ['store', 'taxes', 'accountsID'].includes(action)) {
        errors.push("Account ID is not provided")
    }

    if (1 > parseFloat(totalCost) && ['taxes'].includes(action)) {
        errors.push("Total Cost can not be less than $1")
    }

    if ((!Array.isArray(cartProducts) || !cartProducts.length) && ['products'].includes(action)) {
        errors.push("Shopping Card doesn't contain products")
    }

    return errors
}



module.exports = { getByID, store, update }