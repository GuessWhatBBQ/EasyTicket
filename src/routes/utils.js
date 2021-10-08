const Bus = require.main.require('./models/bus');

async function updateNavbar(request, response, next) {
    if (response.locals.decodedToken) {
        response.renderAppend({
            FirstName: response.locals.decodedToken.firstname,
            loggedIn: true,
        });
    }
    next();
}

async function fetchLocationList(request, response, next) {
    let locationList = await Bus.getLocationList();
    locationList = locationList.map(({ locations }) => locations);
    const locations = locationList;
    response.renderAppend({ locations });
    next();
}

exports.updateNavbar = updateNavbar;
exports.fetchLocationList = fetchLocationList;
