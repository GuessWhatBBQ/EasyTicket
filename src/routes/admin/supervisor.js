const bcrypt = require('bcrypt');

const Supervisor = require.main.require('./models/admin/supervisor');
const User = require.main.require('./models/user');

async function addSupervisorInfo(request, response, next) {
    const supervisorList = await Supervisor.getSupervisors();
    response.renderAppend({ supervisorList });
    next();
}

async function registerNewSupervisor(request, response) {
    const formdata = request.body;
    console.log(formdata);
    formdata.password = await bcrypt.hash(formdata.password, 10);
    await User.create(
        formdata.email,
        formdata.password,
        formdata.firstName,
        formdata.lastName,
        formdata.phoneNumber,
    );
    await Supervisor.addSupervisor(formdata.email);
    const payload = {
        status: 'ok',
        statusMsg: 'Supervisor added successfully',
    };
    response.json(payload);
}

exports.addSupervisorInfo = addSupervisorInfo;
exports.registerNewSupervisor = registerNewSupervisor;
