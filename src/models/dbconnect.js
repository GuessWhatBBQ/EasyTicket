const { Client } = require("pg");
require('dotenv').config()

const dbclient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

dbclient.connect()
    .catch((reason) => {
        console.log(reason)
        if (reason.code === 'ECONNREFUSED') {
            console.log("Did you forget to start the database again ? Silly you :{");
        }
        process.exit(1)
    })

exports.dbclient = dbclient;
