const mysql = require("mysql2/promise");

const pool = mysql.createPool({
        host: "74.208.204.184",
        user: "sa",
        password: "d$AnWY5/",
        database: "maestro",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
})

module.exports = pool;