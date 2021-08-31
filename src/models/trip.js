const { dbclient } = require('./dbconnect');

function createNewSeatingArrangement(columns, rows) {
    const seatingArrangement = {};

    // Creates an array of numbers from 1 -> rows
    const numbers = [...Array(columns).keys()].map((i) => i + 1);
    // Creates an array of letters from A -> char(columns)
    const letters = [...String.fromCharCode(...[...Array(rows).keys()].map((number) => number + 'A'.charCodeAt(0)))];

    letters.forEach((letter) => {
        numbers.forEach((number) => {
            seatingArrangement[letter + number] = false;
        });
    });
    return seatingArrangement;
}

async function createNewTrip(busID, startingDate) {
    // Row and Column defaults
    const columns = 4;
    const rows = 10;

    const querystr = `
        INSERT INTO trip (bus_id, starting_date, seating_arrangement)
            VALUES ($1, $2, $3);
    `;
    const seatingArrangement = createNewSeatingArrangement(columns, rows);
    await dbclient.query(querystr, [busID, startingDate, seatingArrangement]);
}

async function updateTrip(tripID, seatNumber) {
    seatNumber = `{${seatNumber}}`;
    const querystr = `
        UPDATE trip
            SET seating_arrangement = jsonb_set(seating_arrangement, $2::text[], to_jsonb('true'::boolean), false)
                WHERE trip_id = $1;
    `;
    await dbclient.query(querystr, [tripID, seatNumber]);
}

async function decrementAvailSeat(tripID) {
    const querystr = `
    UPDATE trip
    SET available_seat = available_seat - 1
    WHERE trip_id = $1
    `;

    await dbclient.query(querystr, [tripID]);
}

exports.createNewTrip = createNewTrip;
exports.updateTrip = updateTrip;
exports.decrementAvailSeat = decrementAvailSeat;
