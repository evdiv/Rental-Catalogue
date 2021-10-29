const execute = require('../db')

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