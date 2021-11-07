require('dotenv').config()
const jwt = require('jsonwebtoken')

const restrict = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const token = req.headers.authorization.split(' ')[1]
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.body.userId = payload.userId || 0
            next()
        } catch(err) {
            res.status(401).send({ error: err.message })
        }
    } else {
        res.status(401).send({ error: 'Token is not provided' })
    }
}

module.exports = restrict