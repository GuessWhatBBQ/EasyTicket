const Trip = require.main.require('./models/supervisor/trip');

async function fetchPassengerInfo(request, response) {
    const passengerInfo = await Trip.getPassengerInfo(request.body.tripID, request.body.seatNumber);
    if (passengerInfo.length !== 0) {
        response.json({ ...passengerInfo[0], found: true });
    } else {
        response.json({ found: false });
    }
}

async function fetchTrips(request, response) {
    const { email } = response.locals.decodedToken;
    const currentSupervisorTrips = await Trip.getTrips(email);
    response.renderAppend({ currentSupervisorTrips });
    response.render('supervisorTrip.pug');
}

exports.fetchPassengerInfo = fetchPassengerInfo;
exports.fetchTrips = fetchTrips;
