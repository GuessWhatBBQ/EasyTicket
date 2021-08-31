const { dbclient } = require('./dbconnect');

const { createNewTrip } = require('./trip');
const { updateTrip } = require('./trip');

async function getTripID(busID, startingDate) {
    const querystr = `
    SELECT trip_id FROM trip
    WHERE
    bus_id = $1
    AND
    starting_date = $2::date;
    `;
    const trip = await dbclient.query(querystr, [busID, startingDate])
        .then((result) => result);
    return trip;
}

async function insertBookingData(email, busID, seatNumber, startingDate) {
    let tripQueryResult = await getTripID(busID, startingDate);
    if (tripQueryResult.rowCount === 0) {
        await createNewTrip(busID, startingDate);
        tripQueryResult = await getTripID(busID, startingDate);
    }

    const tripID = tripQueryResult.rows[0].trip_id;

    await updateTrip(tripID, seatNumber);

    const querystr = `
    INSERT INTO booking (passenger_id, trip_id, seat_number) VALUES ((SELECT user_id FROM user_account WHERE email = $1), $2, $3);
    `;

    await dbclient.query(querystr, [email, tripID, seatNumber]);
}

async function getBookingInfo(email) {
    const querystr = `
    SELECT first_name, last_name, email, phone_number, pickup, destination, starting_weekday, starting_time, arrival_weekday, arrival_time FROM booking INNER JOIN user_account ON (booking.passenger_id = user_account.user_id) INNER JOIN trip ON (booking.trip_id = trip.trip_id) INNER JOIN bus ON (trip.bus_id = bus.bus_id) WHERE email = $1;
    `;

    const bookingInfo = await dbclient.query(querystr, [email])
        .then((result) => result.rows);

    return bookingInfo;
}

exports.insertBookingData = insertBookingData;
exports.getBookingInfo = getBookingInfo;
