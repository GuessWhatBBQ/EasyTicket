const { router } = require("./routes/index")

port = process.env.SERVER_HOSTING_PORT || 9000

router.start(port)
