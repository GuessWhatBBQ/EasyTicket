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

const { updateNavbar } = require('./utils');

const { addBusRoute } = require('./admin/busroutes');
const { cancelTripForSpecifcDate } = require('./admin/trip');
const { fetchSupervisors } = require('./admin/supervisor');

const router = new Router();

router.use(verifyJWT, updateNavbar);

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

router.post('/api/admin/addbusroute', addBusRoute);
router.post('/api/admin/canceltrip', cancelTripForSpecifcDate);
router.post('/api/admin/fetchsupervisors', fetchSupervisors);

exports.router = router;
