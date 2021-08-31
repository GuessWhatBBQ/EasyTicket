const Bus = require('../models/bus');

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

        date.setDate(date.getDate() + weekdays[route.arrival_weekday] - weekdays[route.starting_weekday]);
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

exports.showAllBusRoutes = showAllBusRoutes;
exports.fetchBusRoutes = fetchBusRoutes;
