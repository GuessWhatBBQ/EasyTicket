const { dbclient } = require.main.require('./models/dbconnect');

async function cancelTripForSpecifcDate(busID, cancelledTripDate) {
    const querystr = `
        INSERT INTO cancelled_trip (bus_id, cancelled_trip_date)
            VALUES ($1, $2::date);
    `;

    await dbclient.query(querystr, [busID, cancelledTripDate]);
}

async function getAllTrips() {
    const querystr = `
        SELECT * FROM bus
            INNER JOIN trip ON bus.bus_id = trip.bus_id
                INNER JOIN supervisor ON supervisor.supervisor_id = bus.supervisor_id
                    INNER JOIN user_account ON user_account.user_id = supervisor.user_id;
    `;

    const trips = dbclient.query(querystr)
        .then((results) => results.rows);

    return trips;
}

exports.cancelTripForSpecifcDate = cancelTripForSpecifcDate;
exports.getAllTrips = getAllTrips;
