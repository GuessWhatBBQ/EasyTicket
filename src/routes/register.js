const bcrypt = require('bcrypt');

const User = require('../models/user');

async function verifyAvailable(request, response, next) {
    const status = await User.exists(request.body.email);
    if (!status) {
        next();
    } else {
        const payload = {
            status: 'Password Verification Failed',
        };
        response.json(payload);
    }
}

async function registerNewUser(request, response, next) {
    const formdata = request.body;
    formdata.password = await bcrypt.hash(formdata.password, 10);
    await User.create(
        formdata.email,
        formdata.password,
        formdata.firstname,
        formdata.lastname,
        formdata.phoneno,
    );
    response.dbQueryUserInfo = await User.getInfo(request.body.email);
    next();
}

exports.verifyAvailable = verifyAvailable;
exports.registerNewUser = registerNewUser;
