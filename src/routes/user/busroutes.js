const Bus = require.main.require('./models/bus');
const Booking = require.main.require('./models/booking');
const Trip = require.main.require('./models/trip');

async function fetchBusRoutes(request, response) {
    const routes = {};
    if (request.body && request.body.pickup && request.body.destination) {
        routes.searchRoutes = await Bus.getBusRoutes(
            request.body.pickup,
            request.body.destination,
            request.body.starting_date,
        );
    } else {
        routes.searchRoutes = await Bus.getAllBusRoutes();
    }
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    const weekdays = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
    };
    routes.searchRoutes = routes.searchRoutes.map((route) => {
        const formattedRoute = route;
        const date = new Date(request.body.starting_date);
        formattedRoute.starting_date = date.toLocaleDateString('en-US', options);
        let arrivalDate = date.getDate();
        arrivalDate += weekdays[route.arrival_weekday] - weekdays[route.starting_weekday];
        date.setDate(arrivalDate);
        formattedRoute.arrival_date = date.toLocaleDateString('en-US', options);
        return formattedRoute;
    });
    response.render('routes.pug', routes);
}

async function showAllBusRoutes(request, response) {
    const routes = await Bus.getPickupAndDestination();
    response.renderAppend({ allRoutes: routes });
    response.render('allroutes.pug');
}

async function fetchSeatingArrangement(request, response) {
    const date = new Date(request.body.starting_date);
    const tripID = await Booking.getTripID(request.body.bus_id, date.toISOString())
        .then((booking) => {
            if (booking.rowCount) {
                return booking.rows[0].trip_id;
            }
            return -1;
        });
    let seatingArrangement = {};
    if (tripID !== -1) {
        seatingArrangement = await Trip.getTripSeatingArrangement(tripID)
            .then((result) => result.rows[0]);
    }
    response.json(seatingArrangement);
}

exports.fetchSeatingArrangement = fetchSeatingArrangement;
exports.showAllBusRoutes = showAllBusRoutes;
exports.fetchBusRoutes = fetchBusRoutes;
