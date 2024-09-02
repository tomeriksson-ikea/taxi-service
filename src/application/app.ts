import express, { Express } from "express";
import { clientHandlers } from "./handlers/Client.handlers";
import { rideRequestHandlers } from "./handlers/RideRequest.handlers";
import { fleetHandlers } from "./handlers/Fleet.handlers";
import { Config } from "./config";
import { RideRequestController } from "../domain/RideRequest/RideRequest.controller";
import { ClientController } from "../domain/Client/Client.controller";
import { FleetController } from "../domain/Fleet/Fleet.controller";
import { RideRequestRepository } from "../repositories/RideRequest.repository";
import { ClientRepository } from "../repositories/Client.repository";
import { FleetRepository } from "../repositories/Fleet.repository";
import { Repository } from "../repositories/Repository";
import { ClientValidator } from "./validators/Client.validator";
import { errorHandler } from "./handlers/Error.handler";
import { StringValidator } from "./validators/String.validator";
import { EmailValidator } from "./validators/Email.validator";
import { RequiredFieldsValidator } from "./validators/RequiredFields.validator";
import { ClientProps } from "../domain/Client/Client";
import { NameValidator } from "./validators/Name.validator";
import { PhoneValidator } from "./validators/Phone.validator";

export const setupApp = async (): Promise<Express> => {
  const config = new Config();

  const connectionString = config.getMongoDBConnectionString();

  const repositories: Repository[] = [];
  const rideRequestRepository = new RideRequestRepository(connectionString);
  repositories.push(rideRequestRepository);

  const clientRepository = new ClientRepository(connectionString);
  repositories.push(clientRepository);

  const fleetRepository = new FleetRepository(connectionString);
  repositories.push(fleetRepository);

  for (const repository of repositories) {
    await repository.init();
  }

  const clientController = new ClientController(clientRepository);
  const fleetController = new FleetController(fleetRepository);
  const rideRequestController = new RideRequestController(
    rideRequestRepository
  );

  const requiredFieldsValidator = new RequiredFieldsValidator<ClientProps>([
    "name",
    "email",
    "phone"
  ]);
  const emailValidator = new EmailValidator(new StringValidator());
  const nameValidator = new NameValidator(new StringValidator());
  const phoneValidator = new PhoneValidator(new StringValidator());

  const clientValidator = new ClientValidator(
    requiredFieldsValidator,
    emailValidator,
    nameValidator,
    phoneValidator
  );

  const app = express();
  app.use(express.json());
  app.use("/clients", clientHandlers(clientController, clientValidator));
  app.use("/fleets", fleetHandlers(fleetController));
  app.use("/ride-requests", rideRequestHandlers(rideRequestController));

  app.use(errorHandler);

  return app;
};
