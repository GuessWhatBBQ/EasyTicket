const { dbclient } = require('./dbconnect');

async function getBusRoutes(pickup, destination, startingDate) {
    let routes = [];
    if (!pickup || !destination || !startingDate) {
        return routes;
    }
    const querystr = `
    SELECT * FROM bus
        WHERE
            pickup = $1
            AND
            destination = $2
            AND
            starting_weekday = $3
            AND
            bus_id NOT IN (
                SELECT bus_id FROM cancelled_trip
                    WHERE
                        cancelled_trip.bus_id = bus.bus_id
                        AND
                        cancelled_trip.cancelled_trip_date = $4
            );
    `;
    routes = await dbclient.query(querystr, [pickup, destination, startingDate.toLocaleDateString('default', { weekday: 'long' }).toLowerCase(), startingDate])
        .then((result) => result.rows);
    return routes;
}

async function getAllBusRoutes() {
    const querystr = `
    SELECT *
    FROM bus;
    `;

    const routes = await dbclient.query(querystr).then((result) => result.rows);
    return routes;
}

async function getPickupAndDestination() {
    const querystr = `
    SELECT DISTINCT pickup, destination
    FROM bus;
    `;

    const pickupAndDestination = await dbclient.query(querystr).then((result) => result.rows);

    return pickupAndDestination;
}

exports.getBusRoutes = getBusRoutes;
exports.getAllBusRoutes = getAllBusRoutes;
exports.getPickupAndDestination = getPickupAndDestination;
