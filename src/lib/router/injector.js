const pug = require('pug');

const { processRequestBody } = require('./helpers');
const { parseCookie } = require('./helpers');

exports.injectResponseHelpers = injectResponseHelpers;
exports.injectRequestHelpers = injectRequestHelpers;

function injectResponseHelpers(response) {
    response.redirect = (route, statuscode = 301) => {
        response.writeHead(statuscode, { Location: route });
        response.end();
    };

    response.send = (content, httpcode = 200, contentType = 'text/html', headers) => {
        for (const header in headers) {
            response.setHeader(header, headers[header]);
        }
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
        try {
            htmlcontent = pug.renderFile(pugfile, locals);
        } catch (error) {
            console.log(error);
        } finally {
            response.send(htmlcontent, httpcode, 'text/html', headers);
        }
    };

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
