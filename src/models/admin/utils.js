const { dbclient } = require.main.require('./models/dbconnect');

async function checkIfAdmin(email) {
    const querystr = `
        SELECT user_id FROM admin NATURAL JOIN user_account WHERE email = $1;
    `;
    const count = await dbclient.query(querystr, [email]).then((result) => result.rowCount);
    if (count === 1) {
        return true;
    }
    return false;
}

exports.checkIfAdmin = checkIfAdmin;
