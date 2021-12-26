require('dotenv').config()
const jwt = require('jsonwebtoken')

const account = (accountsID) => {
    return jwt.sign({ accountsID }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    })
}

const admin = (adminID) => {
    return jwt.sign({ adminID }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = { account, admin }

