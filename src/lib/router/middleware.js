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

async function ignoreReq(request, response) {
    response.redirect('/pagenotfound', 307);
}

exports.getStaticResouce = getStaticResouce;
exports.ignoreReq = ignoreReq;
