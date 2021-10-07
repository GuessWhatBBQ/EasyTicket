const AdminUtils = require.main.require('./models/admin/utils');

async function checkIfAdmin(request, response, next) {
    if (response.locals.decodedToken) {
        const status = await AdminUtils.checkIfAdmin(response.locals.decodedToken.email);
        if (status) {
            next();
        } else {
            response.redirect('/pagenotfound');
        }
    } else {
        response.redirect('/signin');
    }
}

exports.checkIfAdmin = checkIfAdmin;
