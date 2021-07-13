const { Router } = require('../lib/router/router');

const { verifyAvailable } = require('./register');
const { registerNewUser } = require('./register');

const { verifyPassword } = require('./login');
const { sendJWT } = require('./login');
const { verifyJWT } = require('./login');

const { getProfile } = require('./profile');
const { updateProfile } = require('./profile');

const { bookTicket } = require('./bookticket');
const { getBookings } = require('./bookticket');

const { fetchBusRoutes } = require('./busroutes');

const { getRenderedTemplate } = require('./utils');
const { updateNavbar } = require('./utils');

const router = new Router();

const Bus = require('../models/bus');

router.use(verifyJWT, updateNavbar, getRenderedTemplate);

router.get('/profile', async (request, response, next) => {
    if (!request.decodedToken) {
        response.redirect('/signin');
    } else {
        next();
    }
}, getBookings, getProfile, async (request, response) => {
    response.render('views/profile.pug');
});

router.post('/api/login', verifyPassword, sendJWT);
router.post('/api/register', verifyAvailable, registerNewUser, sendJWT);
router.post('/api/updateprofile', verifyPassword, updateProfile, sendJWT);

router.get('/routes', async (request, response) => {
    const routes = await Bus.getPickupAndDestination();
    response.renderAppend({ allRoutes: routes });
    response.render('views/allroutes.pug');
});
router.post('/routesearch', fetchBusRoutes);
router.post('/api/bookticket', bookTicket);

exports.router = router;
