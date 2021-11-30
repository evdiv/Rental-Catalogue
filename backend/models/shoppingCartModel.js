const execute = require('../db')


const store = async(reqBody) => {
    const errors = validate(reqBody, "store")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    reqBody.cartProducts.forEach(el => {
        const sql = `INSERT INTO shoppingcart (productsID, rentalRate, accountsID, qty, days)
                    VALUES(?, ?, ?, ?, ?)`;

        const params = [
            el.product.productsID,
            el.product.dailyRentalRate,
            reqBody.accountsID,
            el.qty,
            el.days
        ]

        const result = await execute(sql, params)
        if (!result.insertId) {
            throw Error("System Error")
        }
    })
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


const validate = (reqBody, action) => {
    const errors = []
    if (!reqBody.accountsID && ['store', 'remove', 'accountsID'].includes(action)) {
        errors.push("Account ID is not provided")
    }
    if ((!reqBody.cartProducts || !reqBody.cartProducts.length) && ['store'].includes(action)) {
        errors.push("Shopping Card doesn't contain products")
    }

    return errors
}

module.exports = { store, remove, getActiveByAcountID }