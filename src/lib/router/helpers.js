function sanitizeURI(string) {
    const plusToSpace = string.replace(/\+/g, ' ');
    return decodeURIComponent(plusToSpace);
}

function parseRouteToRegex(routeURL, exclusive) {
    let regexMatch = routeURL;
    if (regexMatch.slice(-1) === '/' && regexMatch.length > 1) {
        regexMatch = regexMatch.split('');
        regexMatch.pop();
        regexMatch = regexMatch.join('');
    }
    regexMatch = regexMatch.split('/');
    const regexSeperator = '\\/';
    regexMatch = regexMatch.join(regexSeperator);
    if (exclusive && regexMatch.length > 0) {
        regexMatch += '$';
    } else {
        regexMatch += '(\\/|$)';
    }
    regexMatch = regexMatch.split('');
    regexMatch.unshift('^');
    regexMatch = regexMatch.join('');
    return new RegExp(regexMatch);
}

function getBodyChunks(request) {
    const body = [];
    return new Promise((resolve) => {
        request
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                resolve(body);
            });
    });
}

function parseURLForm(buffer) {
    const textStream = sanitizeURI(Buffer.concat(buffer).toString());
    const formdata = Object.fromEntries(textStream.split('&').map((string) => string.split('=')));
    return formdata;
}

function parseJSON(buffer) {
    return JSON.parse(
        sanitizeURI(
            Buffer.concat(buffer).toString(),
        ),
    );
}

async function processRequestBody(request) {
    let formdata;
    const body = await getBodyChunks(request);
    if (!body) {
        return formdata;
    }
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        formdata = parseURLForm(body);
    } else if (request.headers['content-type'] === 'application/json' && body.length > 0) {
        formdata = parseJSON(body);
    }
    return formdata;
}

function parseCookie(request) {
    let processedCookie;
    if (!request.headers.cookie) {
        return processedCookie;
    }
    const rawCookie = sanitizeURI(request.headers.cookie);
    if (rawCookie) {
        let cookies = rawCookie.split(' ');
        cookies = cookies.map((cookie) => {
            let formattedCookie = cookie;
            if (cookie.slice(-1) === ';') {
                formattedCookie = formattedCookie.split('');
                formattedCookie.pop();
                formattedCookie = formattedCookie.join('');
            }
            return formattedCookie;
        });
        processedCookie = Object.fromEntries(cookies.map((string) => string.split('=')));
    }
    return processedCookie;
}

exports.processRequestBody = processRequestBody;
exports.parseCookie = parseCookie;
exports.parseRouteToRegex = parseRouteToRegex;
