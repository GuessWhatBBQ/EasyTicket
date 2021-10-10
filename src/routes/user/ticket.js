const Trip = require.main.require('./models/supervisor/trip');
async function fetchUserTicket(request, response) {
    let passengerInfo = await Trip.getPassengerInfo(request.body.tripID, request.body.seats.split(',')[0]);
    [passengerInfo] = passengerInfo;
    passengerInfo.seats = request.body.seats;
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    const weekdays = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
    };
    const formattedBooking = passengerInfo;
    formattedBooking.starting_date = passengerInfo.starting_date.toLocaleDateString('en-US', options);
    const date = new Date(passengerInfo.starting_date);
    let arrivalDate = date.getDate();
    if (weekdays[passengerInfo.arrival_weekday] >= weekdays[passengerInfo.starting_weekday]) {
        arrivalDate += weekdays[passengerInfo.arrival_weekday] - weekdays[passengerInfo.starting_weekday];
    } else {
        arrivalDate += weekdays[passengerInfo.arrival_weekday] + (weekdays.saturday - weekdays[passengerInfo.starting_weekday]);
    }
    date.setDate(arrivalDate);
    formattedBooking.arrival_date = date.toLocaleDateString('en-US', options);
    passengerInfo = formattedBooking;

    if (passengerInfo.length !== 0) {
        response.render('ticket.pug', { passengerInfo });
    } else {
        response.json({ found: false });
    }
}

exports.fetchUserTicket = fetchUserTicket;
