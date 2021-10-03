const Trip = require.main.require('./models/admin/trip');

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

exports.cancelTripForSpecifcDate = cancelTripForSpecifcDate;
