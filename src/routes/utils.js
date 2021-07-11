const path = require('path');
const fs = require('fs');

async function updateNavbar(request, response, next) {
    if (request.decodedToken) {
        response.renderAppend({
            FirstName: request.decodedToken.firstname,
            loggedIn: true,
        });
    }
    next();
}

async function getRenderedTemplate(request, response, next) {
    let filePath = path.join(__dirname, '../views', request.url === '/' ? 'index' : request.url);
    filePath += '.pug';
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            next();
        } else {
            try {
                response.render(filePath);
            } catch (e) {
                next();
            }
        }
    });
}

exports.getRenderedTemplate = getRenderedTemplate;
exports.updateNavbar = updateNavbar;
