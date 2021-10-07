const Bus = require.main.require('./models/admin/bus');

async function addBusRoute(request, response) {
    const payload = {
        status: 'OK',
    };
    const busInfo = {};
    try {
        busInfo.pickup = request.body.pickup;
        busInfo.destination = request.body.destination;
        busInfo.startingWeekday = request.body.startingWeekday;
        busInfo.startingTime = request.body.startingTime;
        busInfo.arrivalWeekday = request.body.arrivalWeekday;
        busInfo.arrivalTime = request.body.arrivalTime;
        busInfo.seatFare = request.body.seatFare;
        busInfo.supervisorID = request.body.supervisorID;

        Bus.addBus(busInfo);
        response.json(payload);
    } catch {
        payload.status = 'ADDROUTEFAILED';
        payload.statusMsg = 'Could not add the bus route';
        response.json(payload);
    }
}

async function showBusPanel(request, response) {
    let activeBus = await Bus.getBusRoutes('sunday', new Date());
    activeBus = activeBus.map((bus) => {
        bus.total_seat = 40;
        return bus;
    });
    response.renderAppend({ activeBus });
    response.render('adminPanelBus.pug');
}

exports.showBusPanel = showBusPanel;
exports.addBusRoute = addBusRoute;
