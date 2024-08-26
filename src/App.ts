import express, { Express } from "express";
import { clientHandlers } from "./Client/Client.handlers";
import { rideRequestHandlers } from "./RideRequest/RideRequest.handlers";
import { fleetHandlers } from "./Fleet/Fleet.handlers";
import { Config } from "./Config/Config";
import { RideRequestController } from "./RideRequest/RideRequest.controller";
import { ClientController } from "./Client/Client.controller";
import { FleetController } from "./Fleet/Fleet.controller";
import { RideRequestRepository } from "./RideRequest/RideRequest.repository";
import { ClientRepository } from "./Client/Client.repository";
import { FleetRepository } from "./Fleet/Fleet.repository";

export const setupApp = async (): Promise<Express> => {
  const config = new Config();

  const connectionString = config.getMongoDBConnectionString();

  const rideRequestRepository = new RideRequestRepository(connectionString);
  const clientRepository = new ClientRepository(connectionString);
  const fleetRepository = new FleetRepository(connectionString);

  for (const repository of [
    rideRequestRepository,
    clientRepository,
    fleetRepository
  ]) {
    await repository.init();
  }

  const clientController = new ClientController(clientRepository);
  const fleetController = new FleetController(fleetRepository);
  const rideRequestController = new RideRequestController(
    rideRequestRepository
  );

  const app = express();
  app.use(express.json());
  app.use("/clients", clientHandlers(clientController));
  app.use("/fleets", fleetHandlers(fleetController));
  app.use("/ride-requests", rideRequestHandlers(rideRequestController));
  return app;
};
