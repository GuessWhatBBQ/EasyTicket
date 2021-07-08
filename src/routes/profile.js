const User = require("../models/user")

exports.getProfile = getProfile
exports.updateProfile = updateProfile

async function getProfile (request, response) {
    let dbQueryUserInfo = await User.getInfo(request.decodedToken.email)
    response.render("views/profile.pug", {
        FirstName: dbQueryUserInfo.first_name,
        LastName: dbQueryUserInfo.last_name,
        PhoneNumber: dbQueryUserInfo.phone_number,
        Email: dbQueryUserInfo.email
    })
}

async function updateProfile(request, response, next) {
    let payload = {
        status: "ok"
    }
    statusCode = 200
    try {
        await User.updateInfo(request.decodedToken.email, request.body.firstname, request.body.lastname, request.body.phoneno)
        next()
    }
    catch(error) {
        console.log(error);
        payload.status = "Update Failed"
        statusCode = 500
    }
    // finally {
    //     response.json(payload, statusCode)
    // }
}
