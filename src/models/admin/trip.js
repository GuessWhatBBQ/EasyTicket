const { dbclient } = require.main.require('./models/dbconnect');

async function cancelTripForSpecifcDate(busID, cancelledTripDate) {
    const querystr = `
        INSERT INTO cancelled_trip (bus_id, cancelled_trip_date)
            VALUES ($1, $2);
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

async function getTrips(pickup, destination, startingDate) {
    let trips = [];
    if (pickup && destination && startingDate) {
        const querystr = `
        SELECT * FROM bus
        INNER JOIN trip ON bus.bus_id = trip.bus_id
        INNER JOIN supervisor ON supervisor.supervisor_id = bus.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        pickup = $1
        AND
        destination = $2
        AND
        starting_date = $3;
        `;

        trips = dbclient.query(querystr, [pickup, destination, startingDate])
            .then((results) => results.rows);
    } else if (pickup && destination) {
        const querystr = `
        SELECT * FROM bus
        INNER JOIN trip ON bus.bus_id = trip.bus_id
        INNER JOIN supervisor ON supervisor.supervisor_id = bus.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        pickup = $1
        AND
        destination = $2
        `;
        trips = dbclient.query(querystr, [pickup, destination])
            .then((results) => results.rows);
    } else if (startingDate) {
        const querystr = `
        SELECT * FROM bus
        INNER JOIN trip ON bus.bus_id = trip.bus_id
        INNER JOIN supervisor ON supervisor.supervisor_id = bus.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
        WHERE
        starting_date = $1
        `;
        trips = dbclient.query(querystr, [startingDate])
            .then((results) => results.rows);
    } else {
        const querystr = `
            SELECT * FROM bus
                INNER JOIN trip ON bus.bus_id = trip.bus_id
                    INNER JOIN supervisor ON supervisor.supervisor_id = bus.supervisor_id
                        INNER JOIN user_account ON user_account.user_id = supervisor.user_id;
        `;

        trips = dbclient.query(querystr)
            .then((results) => results.rows);
    }

    return trips;
}

exports.cancelTripForSpecifcDate = cancelTripForSpecifcDate;
exports.getAllTrips = getAllTrips;
exports.getTrips = getTrips;
