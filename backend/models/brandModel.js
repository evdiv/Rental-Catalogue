const connection = require('../db')

const execute = async (sql, params) => {
    params = params || []
    try{
        const db = await connection()
        const [rows] = await db.execute(sql, params);
        return rows
    } catch(error) {
        console.log(`Connection error ${error.message}`)
        process.exit(1)
    }
}

const getAll = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM brands WHERE Active = 1';
    return await execute(sql)
}

const getByID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM brands WHERE Active = 1 AND brandsID = ? LIMIT 20';
    const params = [id]

    return await execute(sql, params)
}

module.exports = { getAll, getByID }