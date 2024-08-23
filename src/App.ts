import express, { Express } from "express";
import { Repositories } from "./Config/Repositories";
import { routes as clientRoutes } from "./Client/Client.routes";
import { routes as fleetRoutes } from "./Fleet/Fleet.routes";
import { registerRideRequestHandlers } from "./RideRequest/RideRequest.routes";
import { Config } from "./Config/Config";

export const setupApp = async (): Promise<Express> => {
  const config = new Config();
  const repositories = new Repositories(config);
  return handlers(repositories);
};

const handlers = (repositories: Repositories): Express => {
  const app = express();
  app.use(express.json());

  app.use("/clients", clientRoutes);
  app.use("/fleets", fleetRoutes);
  app.use(
    "/ride-requests",
    registerRideRequestHandlers(repositories.getRideRequestRepository())
  );

  return app;
};
