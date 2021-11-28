const execute = require('../db')

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM orders WHERE Active = 1 AND ordersID = ?';
    const params = [id]
    const rows = await execute(sql, params)
    return rows[0]
}

const store = async (reqBody) => {
    
}

const update = async (reqBody) => {

}


module.exports = { getByID, store, update }