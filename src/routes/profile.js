const User = require('../models/user');

async function getProfile(request, response, next) {
    const dbQueryUserInfo = await User.getInfo(request.decodedToken.email);
    if (dbQueryUserInfo) {
        response.renderAppend({
            FirstName: dbQueryUserInfo.first_name,
            LastName: dbQueryUserInfo.last_name,
            PhoneNumber: dbQueryUserInfo.phone_number,
            Email: dbQueryUserInfo.email,
        });
        next();
    }
}

async function updateProfile(request, response, next) {
    const payload = {
        status: 'ok',
        statusMsg: 'Done',
    };
    await User.updateInfo(
        request.decodedToken.email,
        request.body.firstname,
        request.body.lastname,
        request.body.phoneno,
    )
        .then(() => {
            next();
        })
        .catch((error) => {
            console.log(error);
            payload.status = 'UPDATEFAIL';
            payload.statusMsg = 'Your account could not be updated at this time';
            const statusCode = 500;
            response.json(payload, statusCode);
        });
}

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
