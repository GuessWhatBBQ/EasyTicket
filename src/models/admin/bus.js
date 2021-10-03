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
exports.addBus = addBus;
