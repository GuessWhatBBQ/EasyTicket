const { dbclient } = require('../dbconnect');

async function getPassengerInfo(tripID) {
    const querystr = `
        SELECT * FROM trip NATURAL JOIN booking WHERE trip_id = $1;
    `;
    const passengerInfo = await dbclient.query(querystr, [tripID]).then((result) => result.rows);
    return passengerInfo;
}

exports.getPassengerInfo = getPassengerInfo;
