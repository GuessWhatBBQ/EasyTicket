const { mime } = require("mime-types")

async function setContentType(request, response, next) {
    contentType = mime.contentType(request.url)
    response.setHeader("Content-Type": contentType )
}
