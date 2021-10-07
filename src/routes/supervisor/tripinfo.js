const Trip = require.main.require('./models/supervisor/trip');

async function fetchPassengerInfo(request, response) {
    const passengerInfo = await Trip.getPassengerInfo(request.body.tripID, request.body.seatNumber);
    response.json(passengerInfo);
}

async function fetchTrips(request, response) {
    const { email } = response.locals.decodedToken;
    const currentSupervisorTrips = await Trip.getTrips(email);
    response.renderAppend({ currentSupervisorTrips });
    response.render('supervisorTrip.pug');
}

exports.fetchPassengerInfo = fetchPassengerInfo;
exports.fetchTrips = fetchTrips;
