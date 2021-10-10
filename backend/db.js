require('dotenv').config()
const mysql = require('mysql2/promise');

// Create the connection pool. 
const connection = async() => {
    try {
        const db = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log(`MySQL connected...`)
        return db

    } catch(error){
        console.log(`Connection error ${error.message}`)
        process.exit(1)
    }
}

module.exports = connection