const execute = require('../db')
const ShoppingCart = require('./shoppingCartModel')
const Shipping = require('./shippingModel')

const getByID = async (id) => {
    id = id || 0
    if (id === 0) {
        throw Error("Order Id cannot be empty")
    }
    const sql = 'SELECT * FROM orders WHERE active = 1 AND ordersID = ?';
    const params = [id]
    const rows = await execute(sql, params)
    if (!rows[0]) {
        throw Error("System Error")
    }
    return rows[0]
}

const store = async (reqBody) => {
    const errors = validate(reqBody, 'products')
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const { accountsID, cartProducts } = reqBody

    const shippingCost = Shipping.getCost({ accountsID, cartProducts })
    const shippingInsuranceCost = Shipping.getShippingInsuranceCost(cartProducts)
    const totalProductsPrice = ShoppingCart.getTotalProductsPrice(cartProducts)

    const totalCostBeforeTaxes = shippingCost + shippingInsuranceCost + totalProductsPrice
    const { tax1, tax2, totalTaxCost } = await getTaxes(accountsID, totalCostBeforeTaxes)
    const totalCost = totalCostBeforeTaxes + totalTaxCost

    const sql = `INSERT INTO orders (accountsID, shipping, shippingInsurance, orderSubTotal, 
                        orderTotal, taxCode1, taxValue1, taxCode2, taxValue2)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        reqBody.accountsID,
        shippingCost.toFixed(2),
        shippingInsuranceCost.toFixed(2),
        totalProductsPrice.toFixed(2),
        totalCost.toFixed(2),
        tax1.code,
        tax1.value,
        tax2.code,
        tax2.value
    ]
    const result = await execute(sql, params)
    
    if (result.affectedRows === 0) {
        throw Error("System Error")
    }
    return result.insertId
}


const update = async (id, reqBody) => {
    const errors = validate({ id }, 'insurance')
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }
  
    const { accountsID, insurance, cartProducts } = reqBody
    const shippingCost = Shipping.getCost({ accountsID, cartProducts })
    const shippingInsuranceCost = insurance ? Shipping.getShippingInsuranceCost(cartProducts) : 0
    const totalProductsPrice = ShoppingCart.getTotalProductsPrice(cartProducts)

    const totalCostBeforeTaxes = shippingCost + shippingInsuranceCost + totalProductsPrice
    const { tax1, tax2, totalTaxCost } = await getTaxes(accountsID, totalCostBeforeTaxes)
    const totalCost = totalCostBeforeTaxes + totalTaxCost

    const sql = `UPDATE orders 
                    SET shipping = ?,
                        shippingInsurance = ?,
                        orderSubTotal = ?,
                        orderTotal = ?,
                        taxCode1 = ?,
                        taxValue1 = ?,
                        taxCode2 = ?,
                        taxValue2 = ?
                    WHERE ordersID = ?`;

    const params = [
        shippingCost.toFixed(2),
        shippingInsuranceCost.toFixed(2),
        totalProductsPrice.toFixed(2),
        totalCost.toFixed(2),
        tax1.code,
        tax1.value,
        tax2.code,
        tax2.value,
        id
    ]

    console.log(params)

    const result = await execute(sql, params)

    if (result.affectedRows === 0) {
        throw Error("System Error")
    }
    return result.affectedRows
}


const getTaxes = async (accountsID, totalCost) => {
    const errors = validate({ accountsID, totalCost }, 'taxes')
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT p.PST, p.GST, p.HST, p.QST FROM provinces AS p, accounts AS a
                    WHERE a.provincesID = p.provincesId
                    AND a.accountsID = ?`;

    const params = [accountsID]
    const rows = await execute(sql, params)

    const taxes = []
    let taxCost = 0
    let totalTaxCost = 0

    if(rows[0].PST > 0){
        taxCost = +(rows[0].PST * totalCost * 0.01)
        totalTaxCost += taxCost
        taxes.push({ code: 'PST', value: taxCost })
    }
    if(rows[0].GST > 0) {
        taxCost = +(rows[0].GST * totalCost * 0.01)
        totalTaxCost += taxCost
        taxes.push({ code: 'GST', value: taxCost })
    }
    if(rows[0].HST > 0) {
        taxCost = +(rows[0].HST * totalCost * 0.01)
        totalTaxCost += taxCost
        taxes.push({ code: 'HST', value: taxCost })
    }
    if (rows[0].QST > 0) {
        taxCost = +(rows[0].QST * totalCost * 0.01)
        totalTaxCost += taxCost
        taxes.push({ code: 'QST', value: taxCost })
    }

    const tax1 = {
        code : (taxes[0] && taxes[0].code) ? taxes[0].code : '',
        value: (taxes[0] && taxes[0].value) ? taxes[0].value.toFixed(2) : 0
    }

    const tax2 = {
        code: (taxes[1] && taxes[1].code) ? taxes[1].code : '',
        value: (taxes[1] && taxes[1].value) ? taxes[1].value.toFixed(2) : 0
    }

    return {tax1, tax2, totalTaxCost}
}


const validate = ({ id, accountsID, totalCost, cartProducts }, action) => {
    const errors = []
    if (!accountsID && ['store', 'taxes', 'accountsID'].includes(action)) {
        errors.push("Account ID is not provided")
    }

    if (!id && ['insurance'].includes(action)) {
        errors.push("Order Id is not defined")
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