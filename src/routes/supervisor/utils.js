const SupervisorUtils = require.main.require('./models/supervisor/utils');

async function checkIfSupervisor(request, response, next) {
    if (response.locals.decodedToken) {
        const status = await SupervisorUtils.checkIfSupervisor(response.locals.decodedToken.email);
        if (status) {
            next();
        } else {
            response.redirect('/pagenotfound');
        }
    } else {
        response.redirect('/signin');
    }
}

exports.checkIfSupervisor = checkIfSupervisor;
