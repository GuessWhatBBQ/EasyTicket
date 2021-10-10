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
    const { pickup, destination } = request.body;
    const startingDate = request.body.starting_date;
    let currentSupervisorTrips = await Trip.getTrips(pickup, destination, startingDate, email);
    currentSupervisorTrips = currentSupervisorTrips.map((trip) => {
        trip.total_seat = 40;
        return trip;
    });
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
    currentSupervisorTrips = currentSupervisorTrips.map((booking) => {
        const formattedBooking = booking;
        formattedBooking.starting_date = booking.starting_date.toLocaleDateString('en-US', options);
        const date = new Date(booking.starting_date);
        let arrivalDate = date.getDate();
        if (weekdays[booking.arrival_weekday] >= weekdays[booking.starting_weekday]) {
            arrivalDate += weekdays[booking.arrival_weekday] - weekdays[booking.starting_weekday];
        } else {
            arrivalDate += weekdays[booking.arrival_weekday] + (weekdays.saturday - weekdays[booking.starting_weekday]);
        }
        date.setDate(arrivalDate);
        formattedBooking.arrival_date = date.toLocaleDateString('en-US', options);
        return formattedBooking;
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
    currentSupervisorTrips = currentSupervisorTrips.map((booking) => {
        const formattedBooking = booking;
        formattedBooking.starting_date = booking.starting_date.toLocaleDateString('en-US', options);
        const date = new Date(booking.starting_date);
        let arrivalDate = date.getDate();
        if (weekdays[booking.arrival_weekday] >= weekdays[booking.starting_weekday]) {
            arrivalDate += weekdays[booking.arrival_weekday] - weekdays[booking.starting_weekday];
        } else {
            arrivalDate += weekdays[booking.arrival_weekday] + (weekdays.saturday - weekdays[booking.starting_weekday]);
        }
        date.setDate(arrivalDate);
        formattedBooking.arrival_date = date.toLocaleDateString('en-US', options);
        return formattedBooking;
    });
    response.renderAppend({ currentSupervisorTrips });
    response.render('supervisorTrip.pug');
}

exports.fetchPassengerInfo = fetchPassengerInfo;
exports.fetchAllSupervisorTrips = fetchAllSupervisorTrips;
exports.fetchSupervisorTrips = fetchSupervisorTrips;
