const execute = require('../db')

const getCost = ({ accountsID, cartProducts }) => {
    return flatRate(cartProducts)
}

const flatRate = (products) => {
    const totalPrice = products.reduce(total, el => {
        return total + (el.product.rentalRate * el.days * el.qty)
    }, 0)
    return totalPrice
}

module.exports = { getCost }