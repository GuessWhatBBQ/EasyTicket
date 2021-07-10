const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

function getContentType(extension) {
    return mime.contentType(extension);
}

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
            response.render(filePath);
        }
    });
}

async function getStaticResource(request, response) {
    let filePath = path.join(__dirname, '../public', request.url === '/' ? 'index.html' : request.url);

    const extname = path.extname(filePath);
    const contentType = getContentType(extname);

    filePath += (contentType === 'text/html' && extname === '') ? '.html' : '';
    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.redirect('/pagenotfound');
        } else {
            response.send(content, 200, contentType);
        }
    });
}

exports.getStaticResource = getStaticResource;
exports.getRenderedTemplate = getRenderedTemplate;
exports.updateNavbar = updateNavbar;
