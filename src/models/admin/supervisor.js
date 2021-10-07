const { dbclient } = require.main.require('./models/dbconnect');

async function getSupervisors() {
    const querystr = `
    SELECT email, first_name, last_name, supervisor_id, phone_number
        FROM supervisor INNER JOIN user_account
            ON user_account.user_id = supervisor.user_id;
    `;
    const supervisors = await dbclient
        .query(querystr)
        .then((result) => result.rows);
    return supervisors;
}

async function addSupervisor(email) {
    const querystr = `
    INSERT INTO supervisor (user_id) VALUES ( (SELECT user_id FROM user_account WHERE email = $1) );
    `;
    dbclient.query(querystr, [email]);
}

exports.getSupervisors = getSupervisors;
exports.addSupervisor = addSupervisor;
