import express from "express";
import { routes as clientRoutes } from "./Client/Client.routes";
import { routes as fleetRoutes } from "./Fleet/Fleet.routes";
import { routes as rideRequestRoutes } from "./RideRequest/RideRequest.routes";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/clients", clientRoutes);

app.use("/fleets", fleetRoutes);

app.use("/ride-requests", rideRequestRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

export { app };
