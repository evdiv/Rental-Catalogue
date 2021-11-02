const md5 = require('md5')
const execute = require('../db')

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM accounts WHERE active = 1 AND accountsID = ?';
    const rows = await execute(sql, params)

    return rows[0]
}

const getByEmail = async (email) => {
    email = email || ''
    const sql = 'SELECT * FROM accounts WHERE active = 1 AND email = ?';
    const params = [email]
    const rows = await execute(sql, params)

    return rows[0]
}

const login = async(email, pass) => {
    email = email || ''
    pass = md5(pass) || ''

    const sql = 'SELECT * FROM accounts WHERE active = 1 AND email = ? AND password = ?';
    const params = [email, pass]
    const rows = await execute(sql, params)

    return rows[0]
}

module.exports = { getByID, getByEmail, login }