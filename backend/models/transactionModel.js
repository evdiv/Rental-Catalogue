const execute = require('../db')


const getByID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM transactions WHERE transactionsId = ?';
    const params = [id]

    return await execute(sql, params)
}


const store = async (ordersID, reqBody) => {
    const errors = validate(reqBody.transaction, 'store')
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const { transaction: { status, paymentMethod } } = reqBody

    const sql = `INSERT INTO transactions (status, paymentMethod, ordersID)
                    VALUES(?, ?, ?)`;

    const params = [
        status,
        paymentMethod,
        ordersID
    ]
    const result = await execute(sql, params)

    if (result.affectedRows === 0) {
        throw Error("System Error")
    }
    return result.insertId
}



const validate = ({ status, paymentMethod }, action) => {
    const errors = []
    if (!status && ['store'].includes(action)) {
        errors.push("Transaction status is not provided")
    }

    if (!paymentMethod && ['store'].includes(action)) {
        errors.push("Payment Method is not provided")
    }
    return errors
}


module.exports = { getByID, store }