const mysql = require("mysql2/promise");

const pool = mysql.createPool({
        host: "confidential",
        user: "confidential",
        password: "confidential",
        database: "confidential",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
})

module.exports = pool;
