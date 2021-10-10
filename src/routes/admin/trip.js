const Trip = require.main.require('./models/admin/trip');
const UserTrip = require.main.require('./models/trip');

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
    supervisorTrips = supervisorTrips.map((booking) => {
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
    supervisorTrips = supervisorTrips.map((booking) => {
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
