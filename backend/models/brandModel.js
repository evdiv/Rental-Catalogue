const execute = require('../db')


const getAll = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM brands WHERE active = 1';
    return await execute(sql)
}

const getByID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM brands WHERE active = 1 AND brandsID = ? LIMIT 20';
    const params = [id]

    return await execute(sql, params)
}

module.exports = { getAll, getByID }