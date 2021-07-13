function parseRouteToRegex(routeURL, exclusive) {
    let regexMatch = routeURL;
    if (routeURL.slice(-1) === '/' && routeURL.length > 1) {
        regexMatch = regexMatch.split('');
        regexMatch.pop();
        regexMatch = regexMatch.join('');
    }
    regexMatch = regexMatch.split('/');
    const regexSeperator = '\\/';
    regexMatch = regexMatch.join(regexSeperator);
    if (exclusive) {
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
    const textStream = decodeURIComponent(Buffer.concat(buffer).toString());
    const formdata = Object.fromEntries(textStream.split('&').map((string) => string.split('=')));
    return formdata;
}

function parseJSON(buffer) {
    return JSON.parse(
        decodeURIComponent(
            Buffer.concat(buffer).toString(),
        ),
    );
}

async function processRequestBody(request) {
    let formdata;
    const body = await getBodyChunks(request);
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        formdata = parseURLForm(body);
    } else if (request.headers['content-type'] === 'application/json' && body.length > 0) {
        formdata = parseJSON(body);
    }
    return formdata;
}

function parseCookie(request) {
    const rawCookie = decodeURIComponent(request.headers.cookie);
    if (rawCookie) {
        const cookies = rawCookie.split(' ');
        cookies.forEach((item, index, array) => {
            let temp;
            if (item.slice(-1) === ';') {
                temp = array[index].split('');
                temp.pop();
                array[index] = temp.join('');
            }
        });
        const processedCookie = Object.fromEntries(cookies.map((string) => string.split('=')));
        return processedCookie;
    }
    return undefined;
}

exports.processRequestBody = processRequestBody;
exports.parseCookie = parseCookie;
exports.parseRouteToRegex = parseRouteToRegex;
