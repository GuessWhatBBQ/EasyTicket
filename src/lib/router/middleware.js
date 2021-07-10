const { mime } = require("mime-types")

async function setContentType(request, response, next) {
    let contentType = mime.contentType(request.url)
    response.setHeader("Content-Type": contentType )
}
