const { dbclient } = require('../dbconnect');

async function addBus(busInfo) {
    const { pickup } = busInfo;
    const { destination } = busInfo;
    const { startingWeekday } = busInfo;
    const { startingTime } = busInfo;
    const { arrivalWeekday } = busInfo;
    const { arrivalTime } = busInfo;
    const { seatFare } = busInfo;
    const { supervisorID } = busInfo;
    const querystr = `
        INSERT INTO bus (pickup, destination, starting_weekday, starting_time, arrival_weekday, arrival_time, seat_fare, supervisor_id) values ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    await dbclient
        .query(
            querystr,
            [
                pickup,
                destination,
                startingWeekday,
                startingTime,
                arrivalWeekday,
                arrivalTime,
                seatFare,
                supervisorID,
            ],
        );
}

async function getBusRoutes(weekday, date) {
    const querystr = `
    SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        WHERE
            starting_weekday = $1
            AND
            bus.bus_id NOT IN (
                SELECT bus_id FROM cancelled_trip
                    WHERE
                        cancelled_trip.bus_id = bus.bus_id
                        AND
                        cancelled_trip.cancelled_trip_date = $2
            );
    `;

    const busRoutes = await dbclient.query(querystr, [weekday, date]).then((result) => result.rows);
    return busRoutes;
}

exports.getBusRoutes = getBusRoutes;
exports.addBus = addBus;
