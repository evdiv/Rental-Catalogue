const connection = require('../db')

const execute = async (sql, params) => {
    params = params || []
    try {
        const db = await connection()
        const [rows] = await db.execute(sql, params);
        return rows
    } catch (error) {
        console.log(`Connection error ${error.message}`)
        process.exit(1)
    }
}

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM accounts WHERE active = 1 AND accountsID = ?';
    const params = [id]

    return await execute(sql, params)
}

const getByEmail = async (email) => {
    email = email || ''
    const sql = 'SELECT * FROM accounts WHERE active = 1 AND email = ?';
    const params = [email]

    return await execute(sql, params)
}

module.exports = { getByID, getByEmail }