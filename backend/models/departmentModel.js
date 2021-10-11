const connection = require('../db')

const execute = async (sql, params) => {
    try{
        const db = await connection()
        const [rows] = await db.execute(sql, params);
        return rows
    } catch(error){
        console.log(`Connection error ${error.message}`)
        process.exit(1)
    }
}

const getByID = async (id) => {
    id = id || 0
    const sql = 'SELECT * FROM `departments` WHERE Active = 1 AND `departmentsID` = ?';
    const params = [id]
    return await execute(sql, params)
}

const getAll = async () => {
    const sql = 'SELECT * FROM `departments` WHERE `Active` = 1';
    return await execute(sql)
}

module.exports = { getByID, getAll }