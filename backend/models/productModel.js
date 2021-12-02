const execute = require('../db')

const getAll = async () => {
    const sql = 'SELECT * FROM products WHERE active = 1 AND rentalRate > 0 LIMIT 10';
    return await execute(sql)
}

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM products WHERE active = 1 AND productsID = ?';
    const params = [id]
    const rows = await execute(sql, params)
    return rows[0]
}

const getFeatured = async() => {
    const sql = 'SELECT * FROM products WHERE active = 1 AND rentalRate > 0 AND featured = 1 LIMIT 10';
    return await execute(sql)
}

const getOnSale = async () => {
    const sql = 'SELECT * FROM products WHERE active = 1 AND rentalRate > 0 AND onSale = 1 LIMIT 10';
    return await execute(sql)
}

const getByBrandID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM products WHERE active = 1 AND rentalRate > 0 AND brandID = ?';
    const params = [id]
    return await execute(sql, params)
}

module.exports = { getAll, getByID, getFeatured, getByBrandID, getOnSale }