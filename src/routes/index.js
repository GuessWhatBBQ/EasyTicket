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
const { cancelUserBooking } = require('./user/bookticket');
const { fetchUserTicket } = require('./user/ticket');

const { fetchBusRoutes } = require('./user/busroutes');
const { showAllBusRoutes } = require('./user/busroutes');
const { fetchSeatingArrangement } = require('./user/busroutes');

const { updateNavbar } = require('./utils');
const { fetchLocationList } = require('./utils');

const { addBusRoute } = require('./admin/busroutes');
const { cancelTripForSpecifcDate } = require('./admin/trip');
const { fetchAdminTrips } = require('./admin/trip');
const { fetchAllAdminTrips } = require('./admin/trip');
const { addSupervisorInfo } = require('./admin/supervisor');
const { registerNewSupervisor } = require('./admin/supervisor');
const { fetchAdminBusRoutes } = require('./admin/busroutes');
const { fetchAllAdminBusRoutes } = require('./admin/busroutes');
const { checkIfAdmin } = require('./admin/utils');

const { fetchPassengerInfo } = require('./supervisor/tripinfo');
const { fetchSupervisorTrips } = require('./supervisor/tripinfo');
const { fetchAllSupervisorTrips } = require('./supervisor/tripinfo');
const { fetchSupervisorBusRoutes } = require('./supervisor/busroutes');
const { fetchAllSupervisorBusRoutes } = require('./supervisor/busroutes');
const { checkIfSupervisor } = require('./supervisor/utils');

const router = new Router();

router.use(verifyJWT, updateNavbar, fetchLocationList);

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
router.post('/api/user/printticket', fetchUserTicket);
router.post('/api/user/cancelbooking', cancelUserBooking);

router.get('/routes', showAllBusRoutes);
router.post('/routesearch', fetchBusRoutes);
router.post('/api/bookticket', bookTicket);

router.post('/api/admin/addbusroute', addBusRoute);
router.post('/api/admin/canceltrip', cancelTripForSpecifcDate);
router.post('/api/admin/addsupervisor', verifyAvailable, registerNewSupervisor);

router.use('/admin', checkIfAdmin);
router.get('/admin/bus', addSupervisorInfo, fetchAllAdminBusRoutes);
router.get('/admin/trips', fetchAllAdminTrips);
router.get('/admin/supervisor', addSupervisorInfo, async (request, response) => {
    response.render('adminPanelSupervisor.pug');
});
router.post('/admin/bus/search', addSupervisorInfo, fetchAdminBusRoutes);
router.post('/admin/trips/search', fetchAdminTrips);

router.post('/api/supervisor/fetchseats', fetchPassengerInfo);
router.use('/supervisor', checkIfSupervisor);
router.get('/supervisor/trips', fetchAllSupervisorTrips);
router.get('/supervisor/bus', fetchAllSupervisorBusRoutes);
router.post('/supervisor/bus/search', fetchSupervisorBusRoutes);
router.post('/supervisor/trips/search', fetchSupervisorTrips);

exports.router = router;
