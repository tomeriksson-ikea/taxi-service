"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const Repositories_1 = require("./Config/Repositories");
const Client_routes_1 = require("./Client/Client.routes");
const Fleet_routes_1 = require("./Fleet/Fleet.routes");
const RideRequest_routes_1 = require("./RideRequest/RideRequest.routes");
const Config_1 = require("./Config/Config");
const setupApp = async () => {
    const config = new Config_1.Config();
    const repositories = new Repositories_1.Repositories(config);
    return handlers(repositories);
};
exports.setupApp = setupApp;
const handlers = (repositories) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/clients", Client_routes_1.routes);
    app.use("/fleets", Fleet_routes_1.routes);
    app.use("/ride-requests", (0, RideRequest_routes_1.registerRideRequestHandlers)(repositories.getRideRequestRepository()));
    return app;
};
