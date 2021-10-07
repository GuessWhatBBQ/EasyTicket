const Trip = require.main.require('./models/supervisor/trip');

async function fetchPassengerInfo(request, response) {
    const passengerInfo = await Trip.getPassengerInfo(request.body.tripID);
    response.json(passengerInfo);
}

exports.fetchPassengerInfo = fetchPassengerInfo;
