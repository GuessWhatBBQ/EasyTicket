const { dbclient } = require("./dbconnect")

async function exists(email) {
    const querystr = `
    SELECT * FROM useraccounts
        WHERE email = '${email}';
    `;
    exists = false
    await dbclient
        .query(querystr)
        .then((result) => {
            if (result.rowCount >= 1) {
                exists = true
            }
        })
        .catch((error) => {
            console.log(error)
        })
    return exists
}

async function create(email, password_hash, firstname, lastname, phone_number) {
    const querystr = `
    INSERT INTO useraccounts (email, password, first_name, last_name, phone_number ) VALUES ($1, $2, $3, $4, $5);
    `;
    await dbclient
        .query(querystr, [email, password_hash, firstname, lastname, phone_number])
}

async function getInfo(email) {
    const querystr = `
    SELECT * FROM useraccounts
        WHERE email = $1;
    `;
    let result = await dbclient.query(querystr, [email])
    if (result.rowCount === 1) {
        let userInfo = result.rows[0]
        return userInfo
    }
    else {
        return undefined
    }
}

async function updateInfo(email, first_name, last_name, phone_number) {
    let currentInfo = await getInfo(email)
    let updatedInfo = {}
    if (!first_name) {
        first_name = currentInfo.first_name
    }
    if (!last_name) {
        last_name = currentInfo.last_name
    }
    if (!phone_number) {
        phone_number = currentInfo.phone_number
    }
    const querystr = `
    UPDATE useraccounts
    SET first_name = $2, last_name = $3, phone_number = $4
            WHERE email = $1
    RETURNING *;
    `
    await dbclient.query(querystr, [email, first_name, last_name, phone_number])
        .catch((error) => {
            console.log(error)
        })
}

exports.create = create
exports.exists = exists
exports.getInfo = getInfo
exports.updateInfo = updateInfo
