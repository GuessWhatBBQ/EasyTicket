const Trip = require.main.require('./models/supervisor/trip');

async function fetchPassengerInfo(request, response) {
    const passengerInfo = await Trip.getPassengerInfo(request.body.tripID, request.body.seatNumber);
    if (passengerInfo.length !== 0) {
        response.json({ ...passengerInfo[0], found: true });
    } else {
        response.json({ found: false });
    }
}

async function fetchSupervisorTrips(request, response) {
    const { email } = response.locals.decodedToken;
    const { pickup, destination, starting_date } = request.body;
    let currentSupervisorTrips = await Trip.getTrips(pickup, destination, starting_date, email);
    currentSupervisorTrips = currentSupervisorTrips.map((trip) => {
        trip.total_seat = 40;
        return trip;
    });
    response.renderAppend({ currentSupervisorTrips });
    response.render('supervisorTrip.pug');
}

async function fetchAllSupervisorTrips(request, response) {
    const { email } = response.locals.decodedToken;
    let currentSupervisorTrips = await Trip.getAllTrips(email);
    currentSupervisorTrips = currentSupervisorTrips.map((trip) => {
        trip.total_seat = 40;
        return trip;
    });
    response.renderAppend({ currentSupervisorTrips });
    response.render('supervisorTrip.pug');
}

exports.fetchPassengerInfo = fetchPassengerInfo;
exports.fetchAllSupervisorTrips = fetchAllSupervisorTrips;
exports.fetchSupervisorTrips = fetchSupervisorTrips;
