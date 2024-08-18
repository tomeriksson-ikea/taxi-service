import { Router } from "express";
import { Client } from "../Client/Client";
import { RideRequest } from "./RideRequest";
import { Fleet } from "../Fleet/Fleet";
import { Bid } from "../Bid/Bid";

const routes = Router();

routes.post("/", (req, res) => {
  res.status(201).send(req.body);
});

routes.get("/", (req, res) => {
  const client = new Client("John Doe", "john.doe@email.com", "123");
  const rideRequest = new RideRequest(client, "123 Main St", "456 Elm St", 50);
  res.status(200).send([rideRequest]);
});

routes.post("/:id/bids", (req, res) => {
  const fleet = new Fleet(
    "Johns Taxi fleet",
    "john.doe@email.com",
    "1234567890"
  );

  const bid = new Bid(fleet, 60);
  res.status(201).send(bid);
});

export { routes };
