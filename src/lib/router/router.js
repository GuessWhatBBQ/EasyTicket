const http = require('http');

const { parseRouteToRegex } = require('./helpers');
const { injectResponseHelpers } = require('./injector');
const { injectRequestHelpers } = require('./injector');
const { getStaticResouce } = require('./middleware');

function Router() {
    this.routeTable = { use: [] };

    http.METHODS.forEach((method) => {
        method = method.toLowerCase();
        this.routeTable[method] = [];

        this[method] = (route, ...requestProcessors) => {
            if (typeof route === 'function') {
                requestProcessors = [route, requestProcessors].flat(Infinity);
                route = '';
            }
            const routeRegex = parseRouteToRegex(route, true);
            const layer = { route, routeRegex, requestProcessors };
            this.routeTable[method].push(layer);
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
            requestProcessors = [route, requestProcessors].flat(Infinity);
            route = '';
        }
        const routeRegex = parseRouteToRegex(route, false);
        const layer = { route, routeRegex, requestProcessors };
        this.routeTable.use.push(layer);
    };

    this.use(getStaticResouce);

    this.processRequest = async (request, response) => {
        injectResponseHelpers(response);
        await injectRequestHelpers(request);
        const routes = this.routeTable[request.method.toLowerCase()];

        await this.processRoute(request, response, [this.routeTable.use, routes].flat(Infinity))
            .catch((reason) => {
                console.log(reason);
            });
    };

    this.processRoute = function processRoute(request, response, routes) {
        return new Promise((resolve, reject) => {
            routes.reduce(async (promise, route) => {
                await promise;
                if (route.routeRegex.test(request.url)) {
                    await route.requestProcessors.reduce(async (promise2, handler) => {
                        await promise2;
                        await this.processMiddleware(handler, request, response)
                            .catch((reason) => {
                                console.log(reason);
                                reject(reason);
                            });
                    }, Promise.resolve());
                }
            }, Promise.resolve());
            resolve();
        });
    };

    this.processMiddleware = (middleware, request, response) => new Promise((resolve, reject) => {
        middleware(request, response, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

exports.Router = Router;
