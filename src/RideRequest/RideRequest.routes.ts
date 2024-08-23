import { Router, Request } from "express";
import { Bid } from "../Bid/Bid";
import { RideRequestRepository } from "./RideRequest.repository";
import { RideRequest } from "./RideRequest";

export const registerRideRequestHandlers = (
  rideRequestRepository: RideRequestRepository
): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const rideRequest = new RideRequest(
      req.body.client,
      req.body.pickupLocation,
      req.body.dropoffLocation,
      req.body.proposedPrice
    );
    await rideRequestRepository.add(rideRequest);

    res.status(201).send(rideRequest);
  });

  routes.get("/", async (req, res) => {
    // List ride requests
    const listedRideRequests = await rideRequestRepository.list();

    res.status(200).send(listedRideRequests);
  });

  routes.get("/:id", async (req, res) => {
    // List ride requests
    const rideRequest = await rideRequestRepository.get(req.params.id);

    res.status(200).send(rideRequest);
  });

  routes.post("/:id/bids", async (req, res) => {
    const rideRequest = await rideRequestRepository.get(req.params.id);

    if (!rideRequest) {
      res.status(404).send({ error: "Ride request not found" });
      return;
    }

    if (rideRequest.hasAcceptedBid()) {
      res
        .status(400)
        .send({ error: "Bidding is closed for this ride request" });
      return;
    }

    const bid = new Bid(req.body.fleet, req.body.bidAmount);

    if (rideRequest.getBids().some(b => b.getFleet().equals(bid.getFleet()))) {
      res.status(400).send({ error: "Fleet already placed a bid" });
      return;
    }

    await rideRequestRepository.addBid(req.params.id, bid);

    res.status(201).send(bid);
  });

  routes.get("/:id/bids", async (req, res) => {
    const rideRequest = await rideRequestRepository.get(req.params.id);
    if (!rideRequest) {
      res.status(404).send({ error: "Ride request not found" });
      return;
    }
    const bids = rideRequest.getBids();
    res.status(200).send(bids);
  });

  routes.put(
    "/:id/bids/:bidId/accept",
    async (req: Request<{ id: string; bidId: string }>, res) => {
      await rideRequestRepository.acceptBid(req.params.id, req.params.bidId);
      res.status(200).send({ accepted: true });
    }
  );

  return routes;
};
