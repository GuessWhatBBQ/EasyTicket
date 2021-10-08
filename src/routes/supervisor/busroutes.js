const Bus = require.main.require('./models/supervisor/bus');

async function fetchSupervisorBusRoutes(request, response) {
    const { email } = response.locals.decodedToken;
    let activeBus = await Bus.getSupervisorBusRoutes('sunday', new Date(), email);
    activeBus = activeBus.map((bus) => {
        bus.total_seat = 40;
        return bus;
    });
    response.renderAppend({ activeBus });
    response.render('supervisorBus.pug');
}

exports.fetchSupervisorBusRoutes = fetchSupervisorBusRoutes;
