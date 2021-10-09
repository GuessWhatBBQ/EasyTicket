const { dbclient } = require('../dbconnect');

async function getSupervisorBusRoutes(pickup, destination, weekday, email) {
    let busRoutes = [];
    if (pickup && destination && weekday && email) {
        const querystr = `
        SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        bus.pickup = $1
        AND
        bus.destination = $2
        AND
        bus.starting_weekday = $3
        AND
        user_account.email = $4;
        `;
        busRoutes = await dbclient.query(querystr, [pickup, destination, weekday, email])
            .then((result) => result.rows);
    } else if (pickup && destination && email) {
        const querystr = `
        SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        bus.pickup = $1
        AND
        bus.destination = $2
        AND
        user_account.email = $3;
        `;

        busRoutes = await dbclient.query(querystr, [pickup, destination, email])
            .then((result) => result.rows);
    } else if (weekday && email) {
        const querystr = `
        SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        bus.starting_weekday = $1
        AND
        user_account.email = $2;
        `;
        busRoutes = await dbclient.query(querystr, [weekday, email])
            .then((result) => result.rows);
    } else if (email) {
        const querystr = `
        SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        user_account.email = $1;
        `;
        busRoutes = await dbclient.query(querystr, [email])
            .then((result) => result.rows);
    }

    return busRoutes;
}

async function getAllSupervisorBusRoutes(email) {
    const querystr = `
    SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
            WHERE
                user_account.email = $1
    ORDER BY bus.starting_weekday ASC;
    `;

    const busRoutes = await dbclient.query(querystr, [email])
        .then((result) => result.rows);

    return busRoutes;
}

exports.getSupervisorBusRoutes = getSupervisorBusRoutes;
exports.getAllSupervisorBusRoutes = getAllSupervisorBusRoutes;
