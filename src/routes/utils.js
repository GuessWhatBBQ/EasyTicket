async function updateNavbar(request, response, next) {
    if (request.decodedToken) {
        response.renderAppend({
            FirstName: request.decodedToken.firstname,
            loggedIn: true,
        });
    }
    next();
}

exports.updateNavbar = updateNavbar;
