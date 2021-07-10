const http = require('http');

const { goUpURL } = require('./helpers');
const { parseRoute } = require('./helpers');
const { injectResponseHelpers } = require('./injector');
const { injectRequestHelpers } = require('./injector');

function Router() {
    this.routeTable = {};

    http.METHODS.forEach((method) => {
        method = method.toLowerCase();
        this.routeTable[method] = {};
        this[method] = (route, ...requestProcessors) => {
            this.routeTable[method][route] = requestProcessors;
            this.routeTable[method][route].callbackfn = this.routeTable[method][route].pop();
        };
    });

    this.start = (port) => {
        const server = http.createServer(this.processRequest);
        server.listen(port, () => {
            console.log(`Server has been started on port ${port}`);
        });
    };

    this.use = (route, ...requestProcessors) => {
        if (typeof route === 'function') {
            requestProcessors = [route];
            route = '/';
        }
        route = parseRoute();
    };

    this.processRequest = async (request, response) => {
        injectResponseHelpers(response);
        await injectRequestHelpers(request);
        try {
            const routes = this.routeTable[request.method.toLowerCase()];
            this.processRoute(request, response, routes);
        } catch (error) {
            console.log(error);
        }
    };

    this.processRoute = async function processRoute(request, response, routes) {
        let baseRoute = request.url;
        while (!routes[baseRoute]) {
            baseRoute = goUpURL(baseRoute);
        }
        for (const middleware of routes[baseRoute]) {
            await this.processMiddleware(middleware, request, response);
        }
        await routes[baseRoute].callbackfn(request, response);
    };

    this.processMiddleware = (middleware, request, response) => new Promise((resolve, reject) => {
        middleware(request, response, (errorMsg) => {
            if (errorMsg) {
                reject(errorMsg);
            } else {
                resolve(true);
            }
        });
    });
}

exports.Router = Router;
