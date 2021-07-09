const http = require("http")

const { goUpURL } = require("./helpers")
const { injectResponseHelpers } = require("./injector")
const { injectRequestHelpers } = require("./injector")

function Router() {
    this.methods = ['delete', 'get', 'post', 'put']
    this.routeTable = new Object()

    this.methods.forEach((method) => {
        this.routeTable[method] = {}
        this[method] = (route, ...requestProcessors) => {
            if (typeof route === 'function') {
                requestProcessors = route
                route = ''
            }
            this.routeTable[method][route] = requestProcessors
            this.routeTable[method][route].callbackfn = this.routeTable[method][route].pop()
        }
    })

    this.start = (port) => {
        const server = http.createServer(this.processRequest)
        server.listen(port, () => {
            console.log(`Server has been started on port ${port}`);
        })
    }

    this.use = (route, ...requestProcessors) => {
        console.log(route);
    }

    this.processRequest = async (request, response) => {
        injectResponseHelpers(response)
        await injectRequestHelpers(request)
        try {
            routes = this.routeTable[request.method.toLowerCase()]
            this.processRoute(request, response, routes)
        } catch (error) {
            console.log(error)
        }
    }

    this.processRoute = async function processRoute(request, response, routes) {
        base_route = request.url
        while (!routes[base_route]) {
            base_route = goUpURL(base_route)
        }
        for (var middleware of routes[base_route]) {
            await this.processMiddleware(middleware, request, response)
        }
        await routes[base_route].callbackfn(request, response)
    }

    this.processMiddleware = (middleware, request, response) => {
        return new Promise((resolve, reject) => {
            middleware(request, response, (errorMsg) => {
                if (errorMsg) {
                    reject(errorMsg)
                }
                else {
                    resolve(true)
                }
            })
        })
    }

}


exports.Router = Router
