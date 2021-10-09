const { dbclient } = require('../dbconnect');

async function getPassengerInfo(tripID, seatNumber) {
    const querystr = `
        SELECT * FROM user_account
            INNER JOIN booking ON booking.passenger_id = user_account.user_id
            INNER JOIN trip ON booking.trip_id = trip.trip_id
            INNER JOIN bus ON bus.bus_id = trip.bus_id
                WHERE booking.trip_id = $1 AND booking.seat_number = $2;
    `;
    const passengerInfo = await dbclient.query(
        querystr, [tripID, seatNumber],
    )
        .then((result) => result.rows);
    return passengerInfo;
}

async function getAllTrips(email) {
    const querystr = `
        SELECT * FROM bus NATURAL JOIN trip
            WHERE supervisor_id = (
                    SELECT supervisor_id FROM supervisor NATURAL JOIN user_account
                        WHERE email = $1
                );
    `;

    const trips = dbclient.query(querystr, [email])
        .then((results) => results.rows);

    return trips;
}

async function getTrips(pickup, destination, date, email) {
    let trips = [];
    if (pickup && destination && date && email) {
        const querystr = `
        SELECT * FROM bus NATURAL JOIN trip
        WHERE supervisor_id = (
            SELECT supervisor_id FROM supervisor NATURAL JOIN user_account
            WHERE
            email = $1
            AND
            pickup = $2
            AND
            destination = $3
            AND
            starting_date = $4
        );
        `;
        trips = dbclient.query(querystr, [email, pickup, destination, date])
            .then((results) => results.rows);
    } else if (date && email) {
        const querystr = `
        SELECT * FROM bus NATURAL JOIN trip
        WHERE supervisor_id = (
            SELECT supervisor_id FROM supervisor NATURAL JOIN user_account
            WHERE
            email = $1
            AND
            starting_date = $2
        );
        `;
        trips = dbclient.query(querystr, [email, date])
            .then((results) => results.rows);
    } else if (pickup && destination && email) {
        const querystr = `
        SELECT * FROM bus NATURAL JOIN trip
        WHERE supervisor_id = (
            SELECT supervisor_id FROM supervisor NATURAL JOIN user_account
            WHERE
            email = $1
            AND
            pickup = $2
            AND
            destination = $3
        );
        `;
        trips = dbclient.query(querystr, [email, pickup, destination])
            .then((results) => results.rows);
    }

    return trips;
}

exports.getPassengerInfo = getPassengerInfo;
exports.getTrips = getTrips;
exports.getAllTrips = getAllTrips;
