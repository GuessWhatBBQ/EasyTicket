const User = require('../models/user');

async function getProfile(request, response) {
    const dbQueryUserInfo = await User.getInfo(request.decodedToken.email);
    response.render('views/profile.pug', {
        FirstName: dbQueryUserInfo.first_name,
        LastName: dbQueryUserInfo.last_name,
        PhoneNumber: dbQueryUserInfo.phone_number,
        Email: dbQueryUserInfo.email,
    });
}

async function updateProfile(request, response, next) {
    const payload = {
        status: 'ok',
    };
    try {
        await User.updateInfo(
            request.decodedToken.email,
            request.body.firstname,
            request.body.lastname,
            request.body.phoneno,
        );
        next();
    } catch (error) {
        console.log(error);
        payload.status = 'Update Failed';
        const statusCode = 500;
        response.json(payload, statusCode);
    }
}

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
