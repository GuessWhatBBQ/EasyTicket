const { dbclient } = require('../dbconnect');

async function getSupervisorBusRoutes(weekday, date, email) {
    const querystr = `
    SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
            WHERE
                starting_weekday = $1
                AND
                user_account.email = $2
                AND
                bus.bus_id NOT IN (
                    SELECT bus_id FROM cancelled_trip
                        WHERE
                            cancelled_trip.bus_id = bus.bus_id
                            AND
                            cancelled_trip.cancelled_trip_date = $3
                );
    `;

    const busRoutes = await dbclient.query(querystr, [weekday, email, date])
        .then((result) => result.rows);

    return busRoutes;
}

exports.getSupervisorBusRoutes = getSupervisorBusRoutes;
