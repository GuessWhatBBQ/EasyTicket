const { dbclient } = require.main.require('./models/dbconnect');

async function getSupervisors() {
    const querystr = `
    SELECT first_name, last_name, supervisor_id
        FROM supervisor INNER JOIN user_account
            ON user_account.user_id = supervisor.user_id;
    `;
    const supervisors = await dbclient
        .query(querystr)
        .then((result) => result.rows);
    return supervisors;
}

exports.getSupervisors = getSupervisors;
