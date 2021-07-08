const Booking = require("../models/booking")

exports.bookTicket = bookTicket
exports.getBookings = getBookings

async function bookTicket(request, response) {
    payload = {
        status: "ok"
    }
    try {
        await Booking.insertBookingData(request.decodedToken.email, request.body.bus_id)
    } catch (error) {
        payload.status = "failed"
    } finally {
        response.json(payload)
    }
}

async function getBookings(request, response, next) {
    let currentBookings = await Booking.getBookingInfo(request.decodedToken.email)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    currentBookings.forEach((item, index, array) => {
        array[index].starting_date = item.starting_date.toLocaleDateString("en-US", options)
        array[index].arrival_date = item.arrival_date.toLocaleDateString("en-US", options)
    })

    response.renderAppend({currentBookings: currentBookings})
    next()
}
