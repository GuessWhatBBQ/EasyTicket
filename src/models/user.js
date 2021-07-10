const { dbclient } = require('./dbconnect');

async function exists(email) {
    const querystr = `
    SELECT * FROM useraccounts
        WHERE email = '${email}';
    `;
    let userExists = false;
    await dbclient
        .query(querystr)
        .then((result) => {
            if (result.rowCount >= 1) {
                userExists = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return userExists;
}

async function create(email, passwordHash, firstname, lastname, phoneNumber) {
    const querystr = `
    INSERT INTO useraccounts (email, password, firstName, lastName, phoneNumber ) VALUES ($1, $2, $3, $4, $5);
    `;
    await dbclient
        .query(querystr, [email, passwordHash, firstname, lastname, phoneNumber]);
}

async function getInfo(email) {
    const querystr = `
    SELECT * FROM useraccounts
        WHERE email = $1;
    `;
    const result = await dbclient.query(querystr, [email]);
    if (result.rowCount === 1) {
        const userInfo = result.rows[0];
        return userInfo;
    }

    return undefined;
}

async function updateInfo(email, firstName, lastName, phoneNumber) {
    const currentInfo = await getInfo(email);
    if (!firstName) {
        firstName = currentInfo.firstName;
    }
    if (!lastName) {
        lastName = currentInfo.lastName;
    }
    if (!phoneNumber) {
        phoneNumber = currentInfo.phoneNumber;
    }
    const querystr = `
    UPDATE useraccounts
    SET firstName = $2, lastName = $3, phoneNumber = $4
            WHERE email = $1
    RETURNING *;
    `;
    await dbclient.query(querystr, [email, firstName, lastName, phoneNumber])
        .catch((error) => {
            console.log(error);
        });
}

exports.create = create;
exports.exists = exists;
exports.getInfo = getInfo;
exports.updateInfo = updateInfo;
