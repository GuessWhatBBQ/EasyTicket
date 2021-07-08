const http = require("http")
const path = require("path")
const fs = require("fs")

const { goUpURL } = require("./helpers")
const { injectResponseHelpers } = require("./injector")
const { injectRequestHelpers } = require("./injector")

function Router() {
    this.start = (port) => {
        const server = http.createServer(this.processRequest)
        server.listen(port, () => {
            console.log(`Server has been started on port ${port}`);
        })
    }

    this.routeTable = {
        getRoutes: {},
        postRoutes: {}
    }

    this.get = (route, ...requestProcessors) => {
        this.routeTable.getRoutes[route] = requestProcessors
        this.routeTable.getRoutes[route].callbackfn = this.routeTable.getRoutes[route].pop()
    }

    this.post = (route, ...requestProcessors) => {
        this.routeTable.postRoutes[route] = requestProcessors
        this.routeTable.postRoutes[route].callbackfn = this.routeTable.postRoutes[route].pop()
    }

    this.processRequest = async (request, response) => {
        injectResponseHelpers(response)
        await injectRequestHelpers(request)
        try {
            if (request.method === 'GET') {
                getRoutes = this.routeTable.getRoutes
                this.processRoute(request, response, getRoutes)
            }
            if (request.method === 'POST') {
                postRoutes = this.routeTable.postRoutes
                this.processRoute(request, response, postRoutes)
            }
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
        return new Promise((resolve) => {
            middleware(request, response, () => {
                resolve(true)
            })
        })
    }

}


exports.Router = Router
