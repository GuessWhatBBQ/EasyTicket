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
const { showAllBusRoutes } = require('./busroutes');
const { fetchSeatingArrangement } = require('./busroutes');

const { getRenderedTemplate } = require('./utils');
const { updateNavbar } = require('./utils');

const router = new Router();

router.use(verifyJWT, updateNavbar, getRenderedTemplate);

router.get('/profile', async (request, response, next) => {
    if (!request.decodedToken) {
        response.redirect('/signin');
    } else {
        next();
    }
}, getBookings, getProfile, async (request, response) => {
    response.render('profile.pug');
});

router.post('/api/login', verifyPassword, sendJWT);
router.post('/api/register', verifyAvailable, registerNewUser, sendJWT);
router.post('/api/updateprofile', verifyPassword, updateProfile, sendJWT);
router.post('/api/fetchseats', fetchSeatingArrangement);

router.get('/routes', showAllBusRoutes);
router.post('/routesearch', fetchBusRoutes);
router.post('/api/bookticket', bookTicket);

exports.router = router;
