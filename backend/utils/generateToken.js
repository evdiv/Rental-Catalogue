require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = (accountsID) => {
    return jwt.sign({ accountsID }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = generateToken

