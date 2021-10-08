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
            bus.bus_id NOT IN (
                SELECT bus_id FROM cancelled_trip
                    WHERE
                        cancelled_trip.bus_id = bus.bus_id
                        AND
                        cancelled_trip.cancelled_trip_date = $4
            );
    `;
    startingDate = new Date(startingDate);
    const weekday = startingDate.toLocaleDateString('default', { weekday: 'long' }).toLowerCase();
    routes = await dbclient.query(querystr, [pickup, destination, weekday, startingDate])
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

async function getLocationList() {
    const querystr = `
        (SELECT pickup AS locations FROM bus)
            UNION
                (SELECT destination AS locations FROM bus);
    `;
    const locations = await dbclient.query(querystr).then((result) => result.rows);
    return locations;
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
exports.getLocationList = getLocationList;
