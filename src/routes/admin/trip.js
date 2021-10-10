const Trip = require.main.require('./models/admin/trip');
const UserTrip = require.main.require('./models/trip');
const { splitDateToBeforeAndAfter } = require.main.require('./lib/utils/date');

async function cancelTripForSpecifcDate(request, response) {
    const payload = {
        status: 'OK',
    };
    try {
        Trip.cancelTripForSpecifcDate(request.body.busID, request.body.cancelledTripDate);
        response.json(payload);
    } catch {
        payload.status = 'ADDROUTEFAILED';
        payload.statusMsg = 'Could not add the bus route';
        response.json(payload);
    }
}

async function fetchAllAdminTrips(request, response) {
    let supervisorTrips = await Trip.getAllTrips();
    supervisorTrips = supervisorTrips.map((trip) => {
        trip.total_seat = 40;
        return trip;
    });
    supervisorTrips = splitDateToBeforeAndAfter(supervisorTrips);
    response.render('adminPanelTrips.pug', { supervisorTrips });
}

async function fetchAdminTrips(request, response) {
    const { pickup, destination } = request.body;
    const startingDate = request.body.starting_date;
    let supervisorTrips = await Trip.getTrips(pickup, destination, startingDate);
    supervisorTrips = supervisorTrips.map((trip) => {
        trip.total_seat = 40;
        return trip;
    });
    supervisorTrips = splitDateToBeforeAndAfter(supervisorTrips);
    response.render('adminPanelTrips.pug', { supervisorTrips });
}

async function fetchAdminSeatingArrangement(request, response) {
    const seatingArrangement = await UserTrip.getTripSeatingArrangement(request.body.tripID)
        .then((result) => result.rows[0]);
    response.json(seatingArrangement);
}

exports.fetchAdminSeatingArrangement = fetchAdminSeatingArrangement;

exports.cancelTripForSpecifcDate = cancelTripForSpecifcDate;
exports.fetchAllAdminTrips = fetchAllAdminTrips;
exports.fetchAdminTrips = fetchAdminTrips;
