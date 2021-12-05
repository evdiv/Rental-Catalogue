const ShoppingCart = require('./shoppingCartModel')
require('dotenv').config()


const getCost = ({ accountsID, cartProducts }) => {
    return getflatRate(cartProducts)
}

const getShippingInsuranceCost = (products) => {
    const totalPrice = ShoppingCart.getTotalProductsPrice(products)
    return totalPrice * process.env.SHIPPING_INSURANCE_RATE
}

const getflatRate = (products) => {
    const totalPrice = ShoppingCart.getTotalProductsPrice(products)
    return totalPrice * process.env.SHIPPING_FLAT_RATE
}

module.exports = { getCost, getShippingInsuranceCost }