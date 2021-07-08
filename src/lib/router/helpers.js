exports.goUpURL = goUpURL
exports.setupCallbacks = setupCallbacks
exports.processRequestBody = processRequestBody

exports.parseCookie = parseCookie

function goUpURL(url) {
    temp = url.split("/")
    if(temp.pop() === '') {
        temp.pop()
    }
    url = temp.join("/")
    if (url === '') {
        url = '/'
    }
    return url
}

function setupCallbacks(routes, processors) {
    routes = processors
    routes.callbackfn = routes.pop()
}

function getBodyChunks(request) {
    body = []
    return new Promise((resolve) => {
        request
            .on("data", (chunk) => {
                body.push(chunk)
            })
            .on("end", () => {
                resolve(body)
            })
    })
}

async function processRequestBody(request) {
    body = await getBodyChunks(request)
    if (request.headers['content-type']==="application/x-www-form-urlencoded") {
        formdata = await parseBody(body)
    }
    else if (request.headers['content-type']==="application/json" && body.length > 0) {
        try {
            formdata = JSON.parse(Buffer.concat(body).toString())
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return undefined
    }
    return formdata
}

function parseBody(stream) {
    stream = Buffer.concat(stream).toString();
    formdata = {}
    stream.split("&").forEach((item, index) => {
        pair = item.split("=")
        formdata[pair[0]] = decodeURIComponent(pair[1])
    })
    return formdata
}

function parseCookie(request) {
    let rawCookie = request.headers.cookie
    if (rawCookie) {
        let cookies = rawCookie.split(" ")
        cookies.forEach((item, index, array) => {
            let temp
            if (item.slice(-1) === ";") {
                temp = array[index].split("")
                temp.pop()
                array[index] = temp.join("")
            }
        })
        let processedCookie = {}
        cookies.forEach((item, index, array) => {
            let pair = item.split("=")
            processedCookie[pair[0]] = pair[1]
        })
        return processedCookie
    }
    else return undefined
}
