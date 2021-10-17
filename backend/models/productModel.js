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

const getAll = async () => {
    const sql = 'SELECT * FROM products WHERE Active = 1 AND DailyRentalRate > 0 LIMIT 10';
    return await execute(sql)
}

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM products WHERE Active = 1 AND productsID = ?';
    const params = [id]
    const rows = await execute(sql, params)
    return rows[0]
}

const getFeatured = async() => {
    const sql = 'SELECT * FROM products WHERE Active = 1 AND DailyRentalRate > 0 AND featured = 1 LIMIT 10';
    return await execute(sql)
}

const getOnSale = async () => {
    const sql = 'SELECT * FROM products WHERE Active = 1 AND DailyRentalRate > 0 AND onSale = 1 LIMIT 10';
    return await execute(sql)
}

const getByBrandID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM products WHERE Active = 1 AND DailyRentalRate > 0 AND brandID = ?';
    const params = [id]
    return await execute(sql, params)
}

module.exports = { getAll, getByID, getFeatured, getByBrandID, getOnSale }