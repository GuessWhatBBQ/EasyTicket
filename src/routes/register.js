const bcrypt = require('bcrypt');

const User = require("../models/index")

async function verifyAvailable(request, response, next) {
    status = await User.exists(request.body.email)
    if (!status) {
        next()
    }
    else {
        let payload = {
            status: 'Password Verification Failed'
        }
        response.json(payload)
    }
}

async function registerNewUser(request, response, next) {
    formdata = request.body
    formdata.password = await bcrypt.hash(formdata.password, 10)
    await User.create(formdata.email, formdata.password, formdata.firstname, formdata.lastname, formdata.phoneno)
    response.dbQueryUserInfo = await User.getInfo(request.body.email)
    next()
}

exports.verifyAvailable = verifyAvailable
exports.registerNewUser = registerNewUser
