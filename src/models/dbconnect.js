const { Client } = require('pg');
require('dotenv').config();

const dbclient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

dbclient.connect()
    .catch((reason) => {
        console.log(reason);
        if (reason.code === 'ECONNREFUSED') {
            console.log('Did you forget to start the database again ? Silly you :{');
        }
        process.exit(1);
    });

exports.dbclient = dbclient;
