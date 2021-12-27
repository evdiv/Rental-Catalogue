const md5 = require('md5')
const generateToken = require('../utils/generateToken')
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

const update = async (reqBody) => {
    const admin = await getByID(reqBody)
    const updatedAdmin = {
        adminID: admin.adminID,
        email: (reqBody.email && reqBody.email !== '') ? reqBody.email : admin.email,
        userName: (reqBody.userName && reqBody.userName !== '') ? reqBody.userName : admin.userName,
        password: (reqBody.password && reqBody.password !== '') ? md5(reqBody.password) : admin.password,
    }

    const sql = `UPDATE admins SET
                        userName = ?,
                        email = ?,
                        password = ? 
                    WHERE adminID = ${admin.adminID}`;

    const params = [
        updatedAdmin.userName, 
        updatedAdmin.email,
        updatedAdmin.password
    ]

    const result = await execute(sql, params)

    if (!result.affectedRows) {
        throw Error("Admin has not been updated")
    }
    return updatedAdmin
}


const login = async (reqBody) => {
    const errors = validate(reqBody, "login")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT adminID, userName, email
                    FROM admins
                    WHERE active = 1
                    AND email = ? 
                    AND password = ?`;

    const params = [reqBody.email, md5(reqBody.password)]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].adminID) {
        throw Error("Can not find an Admin")
    }

    const token = generateToken.admin(rows[0].adminID)

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

module.exports = { getByID, getByEmail, login, update }