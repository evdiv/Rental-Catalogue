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

const getByID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM products WHERE Active = 1 AND productsID = ?';
    const params = [id]
    return await execute(sql, params)
}

const getFeatured = async() => {
    const sql = 'SELECT * FROM products WHERE Active = 1 AND DailyRentalRate > 0 AND featured = 1 LIMIT 5';
    return await execute(sql)
}

const getByBrandID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM products WHERE Active = 1 AND DailyRentalRate > 0 AND brandID = ?';
    const params = [id]
    return await execute(sql, params)
}

module.exports = { getByID, getFeatured, getByBrandID }