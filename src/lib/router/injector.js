const pug = require('pug');
const path = require('path');

const { processRequestBody } = require('./helpers');
const { parseCookie } = require('./helpers');

function injectResponseHelpers(response) {
    response.redirect = (route, statuscode = 302) => {
        response.writeHead(statuscode, { Location: route });
        response.end();
    };

    response.send = (content, httpcode = 200, contentType = 'text/html', headers = {}) => {
        Object.entries(headers).forEach(([headerName, headerValue]) => {
            response.setHeader(headerName, headerValue);
        });
        response.writeHead(httpcode, { 'Content-Type': contentType });
        response.write(content, 'utf8');
        response.end();
    };

    response.json = (jsonObject, httpcode = 200, headers) => {
        response.send(JSON.stringify(jsonObject), httpcode, 'application/json', headers);
    };

    response.render = (pugfile, locals = {}, httpcode = 200, headers) => {
        let htmlcontent = '';
        locals = {
            ...response.renderlocals,
            ...locals,
        };
        const viewsPath = path.join(__dirname, '../../views', pugfile);
        htmlcontent = pug.renderFile(viewsPath, locals);
        response.send(htmlcontent, httpcode, 'text/html', headers);
    };

    response.locals = {};
    response.renderlocals = {};

    response.renderAppend = (object) => {
        response.renderlocals = {
            ...response.renderlocals,
            ...object,
        };
    };
}

async function injectRequestHelpers(request) {
    request.body = await processRequestBody(request);
    request.cookie = await parseCookie(request);
}

exports.injectResponseHelpers = injectResponseHelpers;
exports.injectRequestHelpers = injectRequestHelpers;
