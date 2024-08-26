import express, { Express } from "express";
import { Repositories } from "./Config/Repositories";
import { clientHandlers } from "./Client/Client.handlers";
import { fleetHandlers } from "./Fleet/Fleet.handlers";
import { rideRequestHandlers } from "./RideRequest/RideRequest.handlers";
import { Config } from "./Config/Config";

export const setupApp = async (): Promise<Express> => {
  const config = new Config();
  const repositories = new Repositories(config);
  return handlers(repositories);
};

const handlers = (repositories: Repositories): Express => {
  const app = express();
  app.use(express.json());

  app.use("/clients", clientHandlers(repositories.getClientRepository()));
  app.use("/fleets", fleetHandlers(repositories.getFleetRepository()));
  app.use(
    "/ride-requests",
    rideRequestHandlers(repositories.getRideRequestRepository())
  );

  return app;
};
