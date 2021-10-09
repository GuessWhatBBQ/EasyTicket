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

async function getBusRoutes(pickup, destination, weekday) {
    const querystr = `
    SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id
            WHERE
                pickup = $1
                AND
                destination = $2
                AND
                starting_weekday = $3;
    `;

    const busRoutes = await dbclient
        .query(querystr, [pickup, destination, weekday])
        .then((result) => result.rows);
    return busRoutes;
}

async function getAllBusRoutes() {
    const querystr = `
    SELECT * FROM bus INNER JOIN supervisor ON bus.supervisor_id = supervisor.supervisor_id
        INNER JOIN user_account ON user_account.user_id = supervisor.user_id ORDER BY bus.starting_weekday;
    `;

    const busRoutes = await dbclient.query(querystr).then((result) => result.rows);
    return busRoutes;
}

async function swapSupervisor(formerSup, replacementSup) {
    const querystr = `
    UPDATE bus SET supervisor_id = $2
        WHERE supervisor_id = $1;
    `;
    await dbclient.query(querystr, [formerSup, replacementSup]);
}

exports.getBusRoutes = getBusRoutes;
exports.getAllBusRoutes = getAllBusRoutes;
exports.addBus = addBus;
exports.swapSupervisor = swapSupervisor;
