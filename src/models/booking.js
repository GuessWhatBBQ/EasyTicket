const { dbclient } = require('./dbconnect');

async function decrementAvailSeat(busID) {
    const querystr = `
    UPDATE bus
    SET available_seat = available_seat - 1
    WHERE bus_id = $1
    `;

    await dbclient.query(querystr, [busID]);
}

async function insertBookingData(email, busID) {
    const querystr = `
    INSERT INTO booking (passenger_id, bus_id) VALUES ((SELECT user_id FROM useraccounts WHERE email = $1), $2);
    `;

    await dbclient.query(querystr, [email, busID]);

    await decrementAvailSeat(busID);
}

async function getBookingInfo(email) {
    const querystr = `
    SELECT first_name, last_name, email, phone_number, pickup, destination, starting_date,starting_time, arrival_date, arrival_time
    FROM booking INNER JOIN useraccounts ON (booking.passenger_id = useraccounts.user_id) INNER JOIN bus ON (booking.bus_id = bus.bus_id)
    WHERE email = $1;
    `;

    const bookingInfo = await dbclient.query(querystr, [email])
        .then((result) => result.rows);

    return bookingInfo;
}

exports.insertBookingData = insertBookingData;
exports.getBookingInfo = getBookingInfo;
