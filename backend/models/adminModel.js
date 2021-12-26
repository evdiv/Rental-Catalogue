const md5 = require('md5')
const generateAdminToken = require('../utils/generateToken')
const execute = require('../db')


const getByID = async (reqBody) => {
    const errors = validate(reqBody, "adminID")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }
    const sql = `SELECT adminID, userName, email, password
                    FROM admins
                    WHERE active = 1 
                    AND adminID = ?`;
    const params = [reqBody.adminID]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].adminID) {
        throw Error("Invalid Admin Id")
    }
    return rows[0]
}

const getByEmail = async (reqBody) => {
    const errors = validate(reqBody, "email")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT adminID, userName, email, password
                    FROM admins
                    WHERE active = 1
                    AND email = ?`;
    const params = [reqBody.email]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].adminID) {
        throw Error("Can not find an Admin")
    }
    return {admin: rows[0]}
}

const login = async (reqBody) => {
    const errors = validate(reqBody, "login")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT adminID, userName, email, password
                    FROM admins
                    WHERE active = 1
                    AND email = ? 
                    AND password = ?`;

    const params = [reqBody.email, md5(reqBody.password)]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].adminID) {
        throw Error("Can not find an Admin")
    }

    const token = generateAdminToken(rows[0].adminID)

    return { admin: rows[0], token}
}

const validate = (reqBody, action) => {
    const errors = []
    if (!reqBody.adminID && ['adminID'].includes(action)) {
        errors.push("Admin ID is not provided")
    }
    if (!reqBody.email && ['login', 'email'].includes(action)) {
        errors.push("Email is required")
    }
    if (!reqBody.password && ['login'].includes(action)) {
        errors.push("Password is required")
    }

    return errors
}

module.exports = { getByID, getByEmail, login }