const execute = require('../db')


const store = async(reqBody) => {
    const errors = validate(reqBody, "store")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    for (const product of reqBody.cartProducts){
        const sql = `INSERT INTO shoppingcart (productsID, rentalRate, qty, days, accountsID, orderID)
                    VALUES(?, ?, ?, ?, ?, ?)`;

        const params = [
            product.productsID,
            product.rentalRate,
            product.qty,
            product.days,
            reqBody.accountsID,
            reqBody.orderID
        ]

        const result = await execute(sql, params)
        if (!result.insertId) {
            throw Error("System Error")
        }
    }
    return reqBody.cartProducts.length
}


const getActiveByAcountID = async (reqBody) => {
    const errors = validate(reqBody, "accountsID")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }
    const sql = `SELECT * FROM shoppingcart
                    WHERE orderID = 0
                    AND accountsID = ?`;

    const params = [reqBody.accountsID]
    const rows = await execute(sql, params)

    return { cart: rows }
}


const remove = async (reqBody) => {
    const errors = validate(reqBody, "remove")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `DELETE FROM shoppingcart
                    WHERE orderID = 0
                    AND accountsID = ?`;

    const params = [reqBody.accountsID]
    const result = await execute(sql, params)

    return result.affectedRows ? result.affectedRows : false;
}

const getTotalProductsPrice = (products) => {
    const totalProductsPrice = products.reduce((total, p) => {
        return total + (parseFloat(p.rentalRate) * parseInt(p.days) * parseInt(p.qty))
    }, 0)

    return totalProductsPrice
}

const validate = ({ accountsID, orderID, cartProducts}, action) => {
    const errors = []
    if (!accountsID && ['store', 'remove', 'accountsID'].includes(action)) {
        errors.push("Account ID is not provided")
    }

    if (!orderID && ['store'].includes(action)) {
        errors.push("Order ID is not provided")
    }

    if ((!Array.isArray(cartProducts) || !cartProducts.length) && ['store'].includes(action)) {
        errors.push("Shopping Card doesn't contain products")
    }

    if (['store'].includes(action)){
        cartProducts.forEach(product => {
            if (parseFloat(product.rentalRate) < 1) {
                errors.push(`Product ID ${product.productsID} doesn't have rental rate`)
            }
            if (parseInt(product.days) < 1){
                errors.push(`Rental term cannot be empty for Product ID ${product.productsID}`)
            }
            if (parseInt(product.qty) < 1){
                errors.push(`Qty cannot be empty for Product ID ${product.productsID}`)
            }
        })
    }
    return errors
}

module.exports = { store, remove, getActiveByAcountID, getTotalProductsPrice }