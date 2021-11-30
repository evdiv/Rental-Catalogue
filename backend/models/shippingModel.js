const execute = require('../db')

const getCost = (products) => {
    return flatRate(products)
}

const flatRate = (products) => {
    const totalPrice = products.reduce(total, el => {
        return total + (el.product.dailyRentalRate * el.days * el.qty)
    }, 0)
    return totalPrice
}

module.exports = { getCost }