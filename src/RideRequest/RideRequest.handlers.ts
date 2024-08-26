import { Request, Router } from "express";
import { RideRequestRepository } from "./RideRequest.repository";
import { RideRequest } from "./RideRequest";
import { Bid } from "../Bid/Bid";

export const rideRequestHandlers = (
  rideRequestRepository: RideRequestRepository
): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const rideRequest = RideRequest.create(req.body);
    await rideRequestRepository.create(rideRequest);
    return res.status(201).send(rideRequest.toRaw());
  });

  routes.post("/:id/bids", async (req, res) => {
    const rideRequest = await rideRequestRepository.get(req.params.id);

    const bid = Bid.create(req.body);
    try {
      rideRequest.addBid(bid);
      await rideRequestRepository.update(rideRequest);
      return res.status(201).send(bid.toRaw());
    } catch (e) {
      return res
        .status(400)
        .send({ id: req.params.id, error: (e as Error).message });
    }
  });

  routes.post(
    "/:id/bids/:bidId/accept",
    async (req: Request<{ id: string; bidId: string }>, res) => {
      const rideRequest = await rideRequestRepository.get(req.params.id);

      rideRequest.acceptBid(req.params.bidId);

      await rideRequestRepository.update(rideRequest);

      const bid = rideRequest.getBid(req.params.bidId);
      return res.status(200).send(bid.toRaw());
    }
  );

  return routes;
};
