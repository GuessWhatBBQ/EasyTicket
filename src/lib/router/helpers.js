function parseRouteToRegex(routeURL, exclusive) {
    if (routeURL.slice(-1) === '/' && routeURL.length > 1) {
        routeURL = routeURL.split('');
        routeURL.pop();
        routeURL = routeURL.join('');
    }
    let regexMatch = routeURL.split('/');
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

function parseURLForm(stream) {
    stream = Buffer.concat(stream).toString();
    const formdata = {};
    stream.split('&').forEach((item) => {
        const pair = item.split('=');
        formdata[pair[0]] = decodeURIComponent(pair[1]);
    });
    return formdata;
}

function parseJSON(stream) {
    return JSON.parse(
        decodeURIComponent(
            Buffer.concat(stream).toString(),
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
        const processedCookie = {};
        cookies.forEach((item) => {
            const pair = item.split('=');
            processedCookie[pair[0]] = pair[1];
        });
        return processedCookie;
    }
    return undefined;
}

exports.processRequestBody = processRequestBody;
exports.parseCookie = parseCookie;
exports.parseRouteToRegex = parseRouteToRegex;
