const Trip = require.main.require('./models/supervisor/trip');
async function fetchUserTicket(request, response) {
    let passengerInfo = await Trip.getPassengerInfo(request.body.tripID, request.body.seats.split(',')[0]);
    [passengerInfo] = passengerInfo;
    passengerInfo.seats = request.body.seats;
    if (passengerInfo.length !== 0) {
        response.render('ticket.pug', { passengerInfo });
    } else {
        response.json({ found: false });
    }
}

exports.fetchUserTicket = fetchUserTicket;
