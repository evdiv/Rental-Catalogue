const execute = require('../db')


const getAll = async () => {
    const sql = `SELECT brandsID, brandName, brandDescription 
                    FROM brands 
                    WHERE active = 1
                    LIMIT 80`;

    const rows = await execute(sql)
    if (!rows[0]) {
        throw Error("Brands are not found")
    }
    return rows
}

const getByID = async(id) => {
    id = id || 0
    const sql = `SELECT brandsID, brandName, brandDescription 
                    FROM brands 
                    WHERE active = 1 
                    AND brandsID = ?`;

    const params = [id]
    const rows = await execute(sql, params)

    if (!rows[0]) {
        throw Error("Brand is not found")
    }
    return rows[0]
}

module.exports = { getAll, getByID }