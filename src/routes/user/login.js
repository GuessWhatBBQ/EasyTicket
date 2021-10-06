const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require.main.require('./models/user');

function failedLogin(response) {
    const payload = {
        status: 'CREDSFAIL',
        statusMsg: 'Credentials don\'t match',
    };
    response.json(payload);
}

async function verifyPassword(request, response, next) {
    const email = request.body.email || response.locals.decodedToken.email;
    const userInfo = await User.getInfo(email);
    try {
        const match = await bcrypt.compare(request.body.password, userInfo.password);
        if (match) {
            response.locals.dbQueryUserInfo = userInfo;
            next();
        } else {
            failedLogin(response);
        }
    } catch {
        failedLogin(response);
    }
}

async function sendJWT(request, response) {
    const tokenSecret = process.env.JWT_SECRET;
    const tokenPayload = {
        firstname: response.locals.dbQueryUserInfo.first_name,
        email: response.locals.dbQueryUserInfo.email,
    };
    const token = await jwt.sign(tokenPayload, tokenSecret, { expiresIn: 60 * 60 * 24 * 7 });
    const payload = {
        status: 'ok',
        token,
    };
    response.json(payload);
}

async function verifyJWT(request, response, next) {
    if (request.cookie && request.cookie['auth-token']) {
        jwt.verify(request.cookie['auth-token'], process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                response.redirect('/login');
            } else {
                response.locals.decodedToken = decoded;
                next();
            }
        });
    } else {
        next();
    }
}

exports.verifyPassword = verifyPassword;
exports.sendJWT = sendJWT;
exports.verifyJWT = verifyJWT;
