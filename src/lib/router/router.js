const http = require('http');

const { parseRouteToRegex } = require('./helpers');
const { injectResponseHelpers } = require('./injector');
const { injectRequestHelpers } = require('./injector');
const { getStaticResouce } = require('./middleware');
const { ignoreReq } = require('./middleware');

function Router() {
    this.routeTable = { use: [] };

    http.METHODS.forEach((method) => {
        method = method.toLowerCase();
        this.routeTable[method] = [];

        this[method] = (route, ...requestProcessors) => {
            if (typeof route === 'function') {
                requestProcessors = [route, requestProcessors].flat(Infinity);
                route = '';
            } else {
                requestProcessors = [requestProcessors].flat(Infinity);
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
        } else {
            requestProcessors = [requestProcessors].flat(Infinity);
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
        this.processRoute(request, response, this.routeTable.use)
            .then(() => this.processRoute(request, response, routes))
            .then(() => this.processRoute(request, response, [{ route: '', routeRegex: new RegExp(''), requestProcessors: [ignoreReq] }]))
            .catch((reason) => {
                console.log(reason);
            });
    };

    this.processRoute = function processRoute(request, response, routes) {
        return new Promise((resolve, reject) => {
            const routesCompleted = routes.reduce(async (routePromise, route) => {
                await routePromise;
                if (route.routeRegex.test(request.url)) {
                    await route.requestProcessors.reduce(async (middlewarePromise, handler) => {
                        await middlewarePromise;
                        await this.processMiddleware(handler, request, response)
                            .catch((reason) => {
                                reject(reason);
                            });
                    }, Promise.resolve());
                }
            }, Promise.resolve());

            routesCompleted
                .then((routesPromise) => {
                    resolve(routesPromise);
                });
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
