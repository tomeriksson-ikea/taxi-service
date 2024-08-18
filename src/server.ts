import express from "express";
import { Client } from "./Client/Client";
import { RideRequest } from "./RideRequest/RideRequest";
import { routes as clientRoutes } from "./Client/Client.routes";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/clients", clientRoutes);

app.post("/fleets", (req, res) => {
  res.status(201).send(req.body);
});

app.post("/ride-requests", (req, res) => {
  res.status(201).send(req.body);
});

app.get("/ride-requests", (req, res) => {
  const client = new Client("John Doe", "john.doe@email.com", "123");
  const rideRequest = new RideRequest(client, "123 Main St", "456 Elm St", 50);
  res.status(200).send([rideRequest]);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

export { app };
