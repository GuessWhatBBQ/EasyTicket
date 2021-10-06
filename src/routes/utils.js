async function updateNavbar(request, response, next) {
    if (response.locals.decodedToken) {
        response.renderAppend({
            FirstName: response.locals.decodedToken.firstname,
            loggedIn: true,
        });
    }
    next();
}

exports.updateNavbar = updateNavbar;
