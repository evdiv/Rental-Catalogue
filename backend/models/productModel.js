const connection = require('../db')

const Product = async (sql, params) => {
    const db = await connection()
    const [rows] = await db.execute(sql, params);
    console.log(rows)
}

const getByID = async(id) => {
    id = id || 0
    const sql = 'SELECT * FROM `products` WHERE `productsID` = ?';
    const params = [id]

    const product = await Product(sql, params)
    return product
}

const getFeatured = async() => {
    const sql = 'SELECT * FROM `products` WHERE `featured` = ? LIMIT 5';
    const params = [1]
    const products = await Product(sql, params)
    return products
}

module.exports = { getByID, getFeatured }