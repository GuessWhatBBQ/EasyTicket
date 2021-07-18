const { dbclient } = require('./dbconnect');

async function exists(email) {
    const querystr = `
    SELECT * FROM useraccounts
        WHERE email = '${email}';
    `;
    const userExists = await dbclient
        .query(querystr)
        .then((result) => {
            if (result.rowCount >= 1) {
                return true;
            }
            return false;
        })
        .catch(() => true); // In case of failure assume user already exists
    return userExists;
}

async function create(email, passwordHash, firstName, lastName, phoneNumber) {
    const querystr = `
    INSERT INTO useraccounts (email, password, first_name, last_name, phone_number ) VALUES ($1, $2, $3, $4, $5);
    `;
    await dbclient
        .query(querystr, [email, passwordHash, firstName, lastName, phoneNumber]);
}

async function getInfo(email) {
    let userInfo;
    const querystr = `
    SELECT * FROM useraccounts
        WHERE email = $1;
    `;
    const result = await dbclient.query(querystr, [email]);
    if (result.rowCount === 1) {
        [userInfo] = result.rows;
    }
    return userInfo;
}

async function updateInfo(email, firstName, lastName, phoneNumber) {
    const currentInfo = await getInfo(email);
    if (!firstName) {
        firstName = currentInfo.first_name;
    }
    if (!lastName) {
        lastName = currentInfo.last_name;
    }
    if (!phoneNumber) {
        phoneNumber = currentInfo.phone_number;
    }
    const querystr = `
    UPDATE useraccounts
    SET first_name = $2, last_name = $3, phone_number = $4
            WHERE email = $1
    RETURNING *;
    `;
    await dbclient.query(querystr, [email, firstName, lastName, phoneNumber]);
}

exports.create = create;
exports.exists = exists;
exports.getInfo = getInfo;
exports.updateInfo = updateInfo;
