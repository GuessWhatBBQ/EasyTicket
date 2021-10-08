const { dbclient } = require('../dbconnect');

async function getPassengerInfo(tripID, seatNumber) {
    const querystr = `
        SELECT first_name, last_name, phone_number FROM user_account INNER JOIN booking ON booking.passenger_id = user_account.user_id WHERE trip_id = $1 AND seat_number = $2;
    `;
    const passengerInfo = await dbclient.query(
        querystr, [tripID, seatNumber],
    )
        .then((result) => result.rows);
    return passengerInfo;
}

async function getTrips(email) {
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

exports.getPassengerInfo = getPassengerInfo;
exports.getTrips = getTrips;
