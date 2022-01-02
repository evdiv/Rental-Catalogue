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
        reqBody.provincesID
    ]
    const result = await execute(sql, params)
    if (!result.insertId){
        throw Error("System Error")
    }

    const accountsID = result.insertId
    const token = generateToken.account(accountsID)

    return { accountsID, token}
}

const update = async (reqBody) => {
    const user = await getByID(reqBody)
    const updatedUser = {
        accountsID: user.accountsID,
        email: user.email,
        firstName: (reqBody.firstName && reqBody.firstName !== '') ? reqBody.firstName : user.firstName,
        lastName: (reqBody.lastName && reqBody.lastName !== '') ? reqBody.lastName : user.lastName,
        password: (reqBody.password && reqBody.password !== '') ? md5(reqBody.password) : user.password,
        homeAddress: (reqBody.homeAddress && reqBody.homeAddress !== '') ? reqBody.homeAddress : user.homeAddress,
        homeCity: (reqBody.homeCity && reqBody.homeCity !== '') ? reqBody.homeCity : user.homeCity,
        postalCode: (reqBody.postalCode && reqBody.postalCode !== '') ? reqBody.postalCode : user.postalCode,
        provincesID: (reqBody.provincesID && reqBody.provincesID !== 0) ? reqBody.provincesID : user.provincesID
    }

    const sql = `UPDATE accounts SET 
                        firstName = ?, 
                        lastName = ?, 
                        password = ?, 
                        homeAddress = ?, 
                        homeCity = ?, 
                        postalCode = ?, 
                        provincesID = ?
                    WHERE accountsID = ${user.accountsID}`;

    const params = [
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.password,
        updatedUser.homeAddress,
        updatedUser.homeCity,
        updatedUser.postalCode,
        updatedUser.provincesID
    ]

    const result = await execute(sql, params)

    if (!result.affectedRows) {
        throw Error("System Error")
    }
    delete updatedUser.password
    return updatedUser
}

const getByID = async (accountsID) => {
    const errors = validate({ accountsID }, "accountsID")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }
    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.password, a.homeAddress, 
                a.homeCity, a.postalCode, a.provincesID, p.provinceName
                    FROM accounts AS a, provinces AS p
                    WHERE a.provincesID = p.provincesID
                    AND a.active = 1 
                    AND a.accountsID = ?`;
    const params = [accountsID]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].accountsID) {
        throw Error("Invalid Id")
    }
    return rows[0]
}

const index = async () => {

    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.homeAddress, 
                a.homeCity, a.postalCode, a.provincesID, p.provinceName
                    FROM accounts AS a, provinces AS p
                    WHERE a.provincesID = p.provincesID
                    AND a.active = 1 
                    LIMIT 20`;

    const rows = await execute(sql)

    if (!rows.length) {
        throw Error("Active users are not found")
    }
    return rows
}


const getByEmail = async (reqBody) => {
    const errors = validate(reqBody, "email")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.password, a.homeAddress,
                a.homeCity, a.postalCode, a.provincesID, p.provinceName
                    FROM accounts AS a, provinces AS p
                    WHERE a.provincesID = p.provincesID
                    AND a.active = 1
                    AND a.email = ?`;
    const params = [reqBody.email]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].accountsID) {
        throw Error("System Error")
    }
    return {user: rows[0]}
}

const login = async (reqBody) => {
    const errors = validate(reqBody, "login")
    if (errors.length > 0) {
        throw Error(errors.join(" "))
    }

    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.password, a.homeAddress,
                a.homeCity, a.postalCode, a.provincesID, p.provinceName 
                    FROM accounts AS a, provinces AS p
                    WHERE a.provincesID = p.provincesID 
                    AND a.active = 1 
                    AND a.email = ? 
                    AND a.password = ?`;

    const params = [reqBody.email, md5(reqBody.password)]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].accountsID) {
        throw Error("System Error")
    }

    const token = generateToken.account(rows[0].accountsID)

    return { user: rows[0], token}
}

const validate = (reqBody, action) => {
    const errors = []
    if (!reqBody.accountsID && ['accountsID'].includes(action)) {
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
    if (!reqBody.provinceID && ['store'].includes(action)) {
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

module.exports = { store, update, index, getByID, getByEmail, login }