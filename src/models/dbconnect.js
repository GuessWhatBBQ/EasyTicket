const { Client } = require("pg");
require('dotenv').config()

const dbclient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

dbclient.connect();

exports.dbclient = dbclient;
