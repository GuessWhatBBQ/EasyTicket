const { dbclient } = require.main.require('./models/dbconnect');

async function cancelTripForSpecifcDate(busID, cancelledTripDate) {
    const querystr = `
        INSERT INTO cancelled_trip (bus_id, cancelled_trip_date)
            VALUES ($1, $2::date);
    `;

    await dbclient.query(querystr, [busID, cancelledTripDate]);
}

exports.cancelTripForSpecifcDate = cancelTripForSpecifcDate;
