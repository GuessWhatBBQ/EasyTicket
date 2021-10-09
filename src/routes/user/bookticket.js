const Booking = require.main.require('./models/booking');
const Trip = require.main.require('./models/trip');
const { splitDateToBeforeAndAfter } = require.main.require('./lib/utils/date');

async function bookTicket(request, response) {
    const payload = {
        status: 'ok',
    };
    const { seats } = request.body;
    const bookingCompleted = seats.reduce(async (bookingPromise, seat) => {
        await bookingPromise;
        await Booking.insertBookingData(
            response.locals.decodedToken.email,
            request.body.bus_id,
            seat,
            request.body.starting_date.split(',')[0],
        );
    }, Promise.resolve());
    bookingCompleted
        .catch(() => {
            payload.status = 'failed';
        })
        .finally(() => {
            response.json(payload);
        });
}

async function getBookings(request, response, next) {
    let currentBookings = await Booking.getBookingInfo(response.locals.decodedToken.email);
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
    currentBookings = currentBookings.map((booking) => {
        const formattedBooking = booking;
        formattedBooking.starting_date = booking.starting_date.toLocaleDateString('en-US', options);
        const date = new Date(booking.starting_date);
        let arrivalDate = date.getDate();
        arrivalDate += weekdays[booking.arrival_weekday] - weekdays[booking.starting_weekday];
        date.setDate(arrivalDate);
        formattedBooking.arrival_date = date.toLocaleDateString('en-US', options);
        return formattedBooking;
    });
    function findMatch(alreadyAddedBooking, bookingToCheck) {
        if (alreadyAddedBooking.trip_id === bookingToCheck.trip_id) {
            return true;
        }
        return false;
    }
    const filteredBookings = [];
    currentBookings.forEach((booking) => {
        const index = filteredBookings.findIndex((bk) => findMatch(bk, booking));
        if (index === -1) {
            booking.seats = [booking.seat_number];
            filteredBookings.push(booking);
        } else {
            filteredBookings[index].seats.push(booking.seat_number);
        }
    });
    currentBookings = splitDateToBeforeAndAfter(filteredBookings);
    response.renderAppend({ currentBookings });
    next();
}

async function cancelUserBooking(request, response) {
    const { tripID } = request.body;
    const { email } = response.locals.decodedToken;
    let seats = await Trip.getSeatsOfTrip(email, tripID);
    const payload = {
        status: 'ok',
    };
    seats = seats.map(({ seat }) => seat);
    const bookingCanceled = seats.reduce(async (bookingPromise, seat) => {
        await bookingPromise;
        await Booking.cancelBooking(tripID, seat);
        await Trip.removeBookingInfo(tripID, seat);
    }, Promise.resolve());
    bookingCanceled
        .then(() => Trip.removeTrip(tripID))
        .catch(() => {
            payload.status = 'failed';
        })
        .finally(() => {
            response.json(payload);
        });
}

exports.bookTicket = bookTicket;
exports.getBookings = getBookings;
exports.cancelUserBooking = cancelUserBooking;
