const { dbclient } = require("./dbconnect");

async function getBusRoutes(pickup, destination, starting_date) {
    let routes;
    if (!pickup || !destination) {
        return;
    }

    else if (!starting_date) {
        const querystr =
        `
        SELECT *
        FROM bus
        WHERE pickup = $1 AND destination = $2;
        `;

        routes = await dbclient.query(querystr, [pickup, destination]).then((result) => {
            return result.rows;
        })
    }

    else {
        const querystr =
        `
        SELECT *
        FROM bus
        WHERE pickup = $1 AND destination = $2 AND starting_date = $3::date;
        `;
        routes = await dbclient.query(querystr, [pickup, destination, starting_date]).then((result) => {
            return result.rows;
        })
    }

    return routes;
}

async function getAllBusRoutes() {
    const querystr =
    `
    SELECT *
    FROM bus;
    `;

    let routes = await dbclient.query(querystr).then((result) => {
        return result.rows;
    })
    return routes;
}

async function getPickupAndDestination() {
    const querystr =
    `
    SELECT DISTINCT pickup, destination
    FROM bus;
    `;

    let pickupAndDestination = await dbclient.query(querystr).then((result) => {
        return result.rows
    });

    return pickupAndDestination;
}

exports.getBusRoutes = getBusRoutes;
exports.getAllBusRoutes = getAllBusRoutes;
exports.getPickupAndDestination = getPickupAndDestination;
