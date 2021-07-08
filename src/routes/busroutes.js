const Bus = require("../models/bus")

exports.fetchBusRoutes = fetchBusRoutes

async function fetchBusRoutes(request, response) {
    let routes = {}
    if (request.body && request.body.pickup && request.body.destination) {
        if (request.body.starting_date) {
            routes.searchRoutes = await Bus.getBusRoutes(request.body.pickup, request.body.destination, request.body.starting_date)
        }
        else {
            routes.searchRoutes = await Bus.getBusRoutes(request.body.pickup, request.body.destination)
        }
    }
    else {
        routes.searchRoutes = await Bus.getAllBusRoutes()
    }
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    routes.searchRoutes.forEach((item, index, array) => {
        array[index].starting_date = item.starting_date.toLocaleDateString("en-US", options)
        array[index].arrival_date = item.arrival_date.toLocaleDateString("en-US", options)
    })
    response.render("views/routes.pug", routes)
}
