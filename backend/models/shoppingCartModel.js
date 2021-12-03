const execute = require('../db')


const store = async(reqBody) => {
    const errors = validate(reqBody, "store")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    for (const el of reqBody.cartProducts){
        const sql = `INSERT INTO shoppingcart (productsID, rentalRate, accountsID, qty, days)
                    VALUES(?, ?, ?, ?, ?)`;

        const params = [
            el.product.productsID,
            el.product.rentalRate,
            reqBody.accountsID,
            el.qty,
            el.days
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


const validate = ({ accountsID, cartProducts}, action) => {
    const errors = []
    if (!accountsID && ['store', 'remove', 'accountsID'].includes(action)) {
        errors.push("Account ID is not provided")
    }

    if ((!Array.isArray(cartProducts) || !cartProducts.length) && ['store'].includes(action)) {
        errors.push("Shopping Card doesn't contain products")
    }

    if (['store'].includes(action)){
        cartProducts.forEach(el => {
            if (parseFloat(el.product.rentalRate) < 1) {
                errors.push(`Product ID ${el.product.productsID} doesn't have rental rate`)
            }
            if (parseInt(el.days) < 1){
                errors.push(`Rental term cannot be empty for Product ID ${el.product.productsID}`)
            }
            if (parseInt(el.qty) < 1){
                errors.push(`Qty cannot be empty for Product ID ${el.product.productsID}`)
            }
        })
    }

    return errors
}

module.exports = { store, remove, getActiveByAcountID }