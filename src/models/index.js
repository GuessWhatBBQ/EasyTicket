const user = require("./user");
const bus = require("./bus");

exports.exists = user.exists;
exports.create = user.create;
exports.getInfo = user.getInfo

exports.getRoutes = bus.getRoutes;
