const { dbclient } = require('./dbconnect');

async function getBusRoutes(pickup, destination, startingDate) {
    let routes;
    if (!pickup || !destination) {
        return;
    }

    if (!startingDate) {
        const querystr = `
        SELECT *
        FROM bus
        WHERE pickup = $1 AND destination = $2;
        `;

        routes = await dbclient.query(querystr, [pickup, destination])
            .then((result) => result.rows);
    } else {
        const querystr = `
        SELECT *
        FROM bus
        WHERE pickup = $1 AND destination = $2 AND starting_date = $3::date;
        `;
        routes = await dbclient.query(querystr, [pickup, destination, startingDate])
            .then((result) => result.rows);
    }

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
