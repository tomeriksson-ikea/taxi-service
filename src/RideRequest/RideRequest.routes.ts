import { Router } from "express";
import { Client } from "../Client/Client";
import { RideRequest } from "./RideRequest";

const routes = Router();

routes.post("/", (req, res) => {
  res.status(201).send(req.body);
});

routes.get("/", (req, res) => {
  const client = new Client("John Doe", "john.doe@email.com", "123");
  const rideRequest = new RideRequest(client, "123 Main St", "456 Elm St", 50);
  res.status(200).send([rideRequest]);
});
export { routes };
