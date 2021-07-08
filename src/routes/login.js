const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config()

const User = require("../models/user")

async function verifyPassword(request, response, next) {
    let email = request.body.email || request.decodedToken.email
    let userInfo = await User.getInfo(email)
    if (!userInfo) {
        return
    }

    let match = await bcrypt.compare(request.body.password, userInfo.password)
    if (match) {
        response.dbQueryUserInfo = userInfo
        next()
    }
    else {
        let payload = {
            status: 'Password Verification Failed'
        }
        response.json(payload)
    }
}

async function sendJWT(request, response) {
    let token_secret = process.env.JWT_SECRET
    let token_payload = {
        firstname: response.dbQueryUserInfo.first_name,
        email: response.dbQueryUserInfo.email,
    }
    let token = await jwt.sign(token_payload, token_secret, { expiresIn: 60*60*24*7 })
    payload = {
        status: 'ok',
        token: token
    }
    response.json(payload)
}

async function verifyJWT(request, response, next) {
    if (request.cookie && request.cookie['auth-token']) {
        jwt.verify(request.cookie['auth-token'], process.env.JWT_SECRET, (error, decoded) => {
            if(error) {
                response.redirect("/login")
            }
            else {
                request.decodedToken = decoded
                next()
            }
        })
    }
    else {
        next()
    }
}

exports.verifyPassword = verifyPassword
exports.sendJWT = sendJWT
exports.verifyJWT = verifyJWT
