const execute = require('../db')


const getAll = async () => {
    const sql = 'SELECT * FROM provinces';
    return await execute(sql)
}

const getByID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM provinces WHERE provincesId = ?';
    const params = [id]

    return await execute(sql, params)
}

module.exports = { getAll, getByID }