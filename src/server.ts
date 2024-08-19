import express, { Express } from "express";
import { routes as clientRoutes } from "./Client/Client.routes";
import { routes as fleetRoutes } from "./Fleet/Fleet.routes";
import { registerRideRequestHandlers } from "./RideRequest/RideRequest.routes";
import { Services } from "./Config/Services";
import { Repositories } from "./Config/Repositories";

const app = express();
const port = 8080;

app.use(express.json());

const setup = async (app: Express): Promise<Express> => {
  const services = new Services("some mongo uri");
  await services.initialize();
  const repositories = new Repositories(services);
  return handlers(app, repositories);
};

const handlers = (app: Express, repositories: Repositories): Express => {
  app.use("/clients", clientRoutes);
  app.use("/fleets", fleetRoutes);
  app.use(
    "/ride-requests",
    registerRideRequestHandlers(repositories.getRideRequestRepository())
  );
  return app;
};

const start = (app: Express) => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
};

setup(app)
  .then(start)
  .catch(console.error);

export { app };
