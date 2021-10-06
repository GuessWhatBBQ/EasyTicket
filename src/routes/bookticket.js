const Booking = require('../models/booking');

async function bookTicket(request, response) {
    const payload = {
        status: 'ok',
    };
    const { seats } = request.body;
    const bookingCompleted = seats.reduce(async (bookingPromise, seat) => {
        await bookingPromise;
        await Booking.insertBookingData(
            request.decodedToken.email,
            request.body.bus_id,
            seat,
            request.body.starting_date,
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
    let currentBookings = await Booking.getBookingInfo(request.decodedToken.email);
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
        if (alreadyAddedBooking.bus_id === bookingToCheck.bus_id) {
            if (alreadyAddedBooking.starting_date === bookingToCheck.starting_date) {
                return true;
            }
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
    currentBookings = filteredBookings;
    response.renderAppend({ currentBookings });
    next();
}

exports.bookTicket = bookTicket;
exports.getBookings = getBookings;
