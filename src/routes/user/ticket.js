const Trip = require.main.require('./models/supervisor/trip');
async function fetchUserTicket(request, response) {
    const passengerInfo = await Trip.getPassengerInfo(request.body.tripID, request.body.seatNumber);
    if (passengerInfo.length !== 0) {
        response.render('ticket.pug', { ...passengerInfo[0], found: true });
    } else {
        response.json({ found: false });
    }
}

exports.fetchUserTicket = fetchUserTicket;
