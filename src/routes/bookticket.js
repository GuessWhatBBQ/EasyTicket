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
    currentBookings = currentBookings.map((booking) => {
        const formattedBooking = booking;
        // formattedBooking.starting_date = booking.starting_date.toLocaleDateString('en-US', options);
        // formattedBooking.arrival_date = booking.arrival_date.toLocaleDateString('en-US', options);
        formattedBooking.arrival_date = {};
        formattedBooking.starting_date = {};
        return formattedBooking;
    });

    response.renderAppend({ currentBookings });
    next();
}

exports.bookTicket = bookTicket;
exports.getBookings = getBookings;
