const { Router } = require("../lib/router/router")

const { verifyAvailable } = require("./register")
const { registerNewUser } = require("./register")

const { verifyPassword } = require("./login")
const { sendJWT } = require("./login")
const { verifyJWT } = require("./login")

const { getProfile } = require("./profile")
const { updateProfile } = require("./profile")

const { bookTicket } = require("./bookticket")
const { getBookings } = require("./bookticket")

const { fetchBusRoutes } = require("./busroutes")

const { getStaticResource } = require("./utils")
const { getRenderedTemplate } = require("./utils")
const { updateNavbar } = require("./utils")
router = new Router()

const Bus = require("../models/bus")

router.get("/", verifyJWT, updateNavbar, getRenderedTemplate, getStaticResource)
router.post("/", (request, response) => {
    response.end()
})

router.get("/profile", verifyJWT, (request, response, next) => {
    if (!request.decodedToken) {
        response.redirect("/signin")
    }
    else {
        next()
    }
}, updateNavbar, getBookings, getProfile)

router.post("/api/login", verifyPassword, sendJWT)
router.post("/api/register", verifyAvailable, registerNewUser, sendJWT)
router.post("/api/updateprofile", verifyJWT, verifyPassword, updateProfile, sendJWT)

router.get("/routes", verifyJWT, updateNavbar, async (request, response) => {
    let routes = await Bus.getPickupAndDestination()
    response.renderAppend({allRoutes:routes})
    response.render("views/allroutes.pug")
})
router.post("/routesearch", verifyJWT, updateNavbar, fetchBusRoutes)
router.post("/api/bookticket", verifyJWT, bookTicket)

exports.router = router
