const { router } = require('./routes/index');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not provided');
}

const port = process.env.SERVER_HOSTING_PORT || 9000;

router.start(port);
