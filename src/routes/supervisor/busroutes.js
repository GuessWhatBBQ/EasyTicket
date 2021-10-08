const Bus = require.main.require('./models/supervisor/bus');

async function fetchSupervisorBusRoutes(request, response) {
    const { email } = response.locals.decodedToken;
    const { weekday, pickup, destination } = request.body;
    let activeBus = await Bus.getSupervisorBusRoutes(
        pickup,
        destination,
        weekday.toLowerCase(),
        email,
    );
    activeBus = activeBus.map((bus) => {
        bus.total_seat = 40;
        return bus;
    });
    response.renderAppend({ activeBus });
    response.render('supervisorBus.pug');
}

async function fetchAllSupervisorBusRoutes(request, response) {
    const { email } = response.locals.decodedToken;
    let activeBus = await Bus.getAllSupervisorBusRoutes(email);
    activeBus = activeBus.map((bus) => {
        bus.total_seat = 40;
        return bus;
    });
    response.renderAppend({ activeBus });
    response.render('supervisorBus.pug');
}

exports.fetchSupervisorBusRoutes = fetchSupervisorBusRoutes;
exports.fetchAllSupervisorBusRoutes = fetchAllSupervisorBusRoutes;
