const { Router } = require('../lib/router/router');

const { verifyAvailable } = require('./user/register');
const { registerNewUser } = require('./user/register');

const { verifyPassword } = require('./user/login');
const { sendJWT } = require('./user/login');
const { verifyJWT } = require('./user/login');

const { getProfile } = require('./user/profile');
const { updateProfile } = require('./user/profile');

const { bookTicket } = require('./user/bookticket');
const { getBookings } = require('./user/bookticket');

const { fetchBusRoutes } = require('./user/busroutes');
const { showAllBusRoutes } = require('./user/busroutes');
const { fetchSeatingArrangement } = require('./user/busroutes');

const { updateNavbar } = require('./utils');

const { addBusRoute } = require('./admin/busroutes');
const { cancelTripForSpecifcDate } = require('./admin/trip');
const { addSupervisorInfo } = require('./admin/supervisor');
const { registerNewSupervisor } = require('./admin/supervisor');
const { showBusPanel } = require('./admin/busroutes');
const { checkIfAdmin } = require('./admin/utils');

const { fetchPassengerInfo } = require('./supervisor/tripinfo');
const { fetchTrips } = require('./supervisor/tripinfo');
const { checkIfSupervisor } = require('./supervisor/utils');

const router = new Router();

router.use(verifyJWT, updateNavbar);

router.get('/profile', async (request, response, next) => {
    if (!response.locals.decodedToken) {
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
router.post('/api/admin/addsupervisor', verifyAvailable, registerNewSupervisor);

router.use('/admin', checkIfAdmin);
router.get('/admin/bus', addSupervisorInfo, showBusPanel);
router.get('/admin/supervisor', addSupervisorInfo, async (request, response) => {
    response.render('adminPanelSupervisor.pug');
});

router.use('/supervisor', checkIfSupervisor);
router.post('/api/supervisor/fetchseats', fetchPassengerInfo);
router.get('/supervisor/trips', fetchTrips);

router.get('/admin/trips');

exports.router = router;
