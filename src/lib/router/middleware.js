const mime = require('mime-types');
const path = require('path');
const fs = require('fs');

function getContentType(extension) {
    return mime.contentType(extension);
}

async function getStaticResouce(request, response, next) {
    let filePath = path.join(__dirname, '../../public', request.url === '/' ? 'index.html' : request.url);
    const extname = path.extname(filePath);
    const contentType = getContentType(extname) || 'text/html';

    filePath += (contentType === 'text/html' && extname === '') ? '.html' : '';
    fs.readFile(filePath, (error, content) => {
        if (error) {
            next();
        } else {
            response.send(content, 200, contentType);
        }
    });
}

async function getRenderedTemplate(request, response, next) {
    let filePath = path.join(__dirname, '../../views', request.url === '/' ? 'index' : request.url);
    filePath += '.pug';
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            next();
        } else {
            try {
                response.render(request.url === '/' ? 'index.pug' : `${request.url}.pug`);
            } catch (e) {
                next();
            }
        }
    });
}

async function ignoreReq(request, response) {
    const headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // HTTP 1.1.
        Pragma: 'no-cache', // HTTP 1.0.
        Expires: '0', // Proxies.
    };
    response.render('/pagenotfound.pug', {}, 404, headers);
}

exports.getStaticResouce = getStaticResouce;
exports.getRenderedTemplate = getRenderedTemplate;
exports.ignoreReq = ignoreReq;
