const md5 = require('md5')
const generateToken = require('../utils/generateToken')
const execute = require('../db')

const getByID = async (id) => {
    if (!id) {
        throw Error("Id can not be empty")
    }
    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.homeAddress, a.homeCity, a.postalCode, p.provinceName
                    FROM accounts AS a, provinces As p 
                    WHERE a.active = 1 
                    AND a.accountsID = ?`;
    const params = [id]
    const rows = await execute(sql, params)

    if (rows[0] == undefined) {
        throw Error("Invalid Id")
    }

    if (rows[0].accountsID) {
        const user = {
            id: rows[0].accountsID,
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

const getByEmail = async (email) => {
    if (!email) {
        throw Error("Email is empty")
    }
    const sql = `SELECT a.accountsID, a.firstName, a.lastName, a.email, a.homeAddress, a.homeCity, a.postalCode, p.provinceName
                    FROM accounts AS a, provinces As p
                    WHERE a.active = 1 
                    AND email = ?`;
    const params = [email]
    const rows = await execute(sql, params)

    if (rows[0] == undefined) {
        throw Error("Invalid Email")
    }

    if (rows[0].accountsID) {
        const user = {
            id: rows[0].accountsID,
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

const login = async(email, pass) => {
    if (!email || !pass){
        throw Error("Email or Password is empty")
    }

    const sql = 'SELECT accountsID, firstName, lastName, email FROM accounts WHERE active = 1 AND email = ? AND password = ?';
    const params = [email, md5(pass)]
    const rows = await execute(sql, params)

    if (rows[0] == undefined || !rows[0].accountsID) {
        throw Error("Invalid Email or Password")
    }

    const user = {
        id: rows[0].accountsID,
        firstName: rows[0].firstName,
        lastName: rows[0].lastName,
        email: rows[0].email,
        token: generateToken(rows[0].accountsID)
    }
    return user
}

module.exports = { getByID, getByEmail, login }