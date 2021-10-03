const Supervisor = require.main.require('./models/admin/supervisor');

async function fetchSupervisors(request, response) {
    const supervisors = await Supervisor.getSupervisors();
    response.json(supervisors);
}

exports.fetchSupervisors = fetchSupervisors;
