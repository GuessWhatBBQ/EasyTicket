const Supervisor = require.main.require('./models/admin/supervisor');

async function addSupervisorOptions(request, response, next) {
    const supervisorList = await Supervisor.getSupervisors();
    response.renderAppend({ supervisorList });
    next();
}

exports.addSupervisorOptions = addSupervisorOptions;
