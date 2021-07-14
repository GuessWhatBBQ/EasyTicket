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
    routes.searchRoutes = routes.searchRoutes.map((route) => {
        const formattedRoute = route;
        formattedRoute.starting_date = route.starting_date.toLocaleDateString('en-US', options);
        formattedRoute.arrival_date = route.arrival_date.toLocaleDateString('en-US', options);
        return formattedRoute;
    });
    response.render('views/routes.pug', routes);
}

exports.fetchBusRoutes = fetchBusRoutes;
