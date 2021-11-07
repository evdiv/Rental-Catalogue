const md5 = require('md5')
const generateToken = require('../utils/generateToken')
const execute = require('../db')


const store = async(reqBody) => {
    const errors = validate(reqBody, "store")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `INSERT INTO accounts (firstName, lastName, email, password, homeAddress, homeCity, postalCode, provincesID)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        reqBody.firstName, 
        reqBody.lastName,
        reqBody.email,
        md5(reqBody.password),
        reqBody.homeAddress,
        reqBody.homeCity,
        reqBody.postalCode,
        reqBody.provinceId
    ]
    const result = await execute(sql, params)
    if (!result.insertId){
        throw Error("System Error")
    }
    return result.insertId
}

const getByID = async (reqBody) => {
    const errors = validate(reqBody, "userId")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.homeAddress, a.homeCity, a.postalCode, p.provinceName
                    FROM accounts AS a, provinces As p 
                    WHERE a.active = 1 
                    AND a.accountsID = ?`;
    const params = [reqBody.userId]
    const rows = await execute(sql, params)

    if (rows[0] == undefined) {
        throw Error("Invalid Id")
    }

    if (rows[0].accountsID) {
        const user = {
            userId: rows[0].accountsID,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            email: rows[0].email,
            homeAddress: rows[0].homeAddress,
            homeCity: rows[0].homeCity,
            postalCode: rows[0].postalCode,
            provinceName: rows[0].provinceName
        }
        return user
    }
}

const getByEmail = async (reqBody) => {
    const errors = validate(reqBody, "email")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.homeAddress, a.homeCity, a.postalCode, p.provinceName
                    FROM accounts AS a, provinces As p
                    WHERE a.active = 1 
                    AND email = ?`;
    const params = [reqBody.email]
    const rows = await execute(sql, params)

    if (rows[0] == undefined) {
        return
    }

    if (rows[0].accountsID) {
        const user = {
            userId: rows[0].accountsID,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            email: rows[0].email,
            homeAddress: rows[0].homeAddress,
            homeCity: rows[0].homeCity,
            postalCode: rows[0].postalCode,
            provinceName: rows[0].provinceName
        }
        return user
    }
}

const login = async (reqBody) => {
    const errors = validate(reqBody, "login")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = 'SELECT accountsID, firstName, lastName, email FROM accounts WHERE active = 1 AND email = ? AND password = ?';
    const params = [email, md5(password)]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].accountsID) {
        throw Error("Invalid Email or Password")
    }

    const user = {
        userId: rows[0].accountsID,
        firstName: rows[0].firstName,
        lastName: rows[0].lastName,
        email: rows[0].email,
        token: generateToken(rows[0].accountsID)
    }
    return user
}

const validate = (reqBody, action) => {
    const errors = []
    if (!reqBody.userId && ['userId'].includes(action)) {
        errors.push("Account ID is not provided")
    }
    if (!reqBody.firstName && ['store'].includes(action)) {
        errors.push("First Name is required")
    }
    if (!reqBody.lastName && ['store'].includes(action)) {
        errors.push("Last Name is required")
    }
    if (!reqBody.homeAddress && ['store'].includes(action)) {
        errors.push("Home Address is required")
    }
    if (!reqBody.homeCity && ['store'].includes(action)) {
        errors.push("Home City is required")
    }
    if (!reqBody.postalCode && ['store'].includes(action)) {
        errors.push("Postal Code is required")
    }
    if (!reqBody.provinceId && ['store'].includes(action)) {
        errors.push("Province is not provided")
    }
    if (!reqBody.email && ['store', 'login', 'email'].includes(action)) {
        errors.push("Email is required")
    }
    if (!reqBody.password && ['store', 'login'].includes(action)) {
        errors.push("Password is required")
    }

    return errors
}

module.exports = { store, getByID, getByEmail, login }