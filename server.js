const { router } = require('./src/routes/index');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not provided');
}

const port = process.env.PORT || 9000;

router.start(port);
