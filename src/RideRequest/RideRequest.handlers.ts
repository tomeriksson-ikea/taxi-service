import { Request, Router } from "express";
import { RideRequestController } from "./RideRequest.controller";

export const rideRequestHandlers = (
  controller: RideRequestController
): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const rideRequest = await controller.createRideRequest(req.body);
    return res.status(201).send(rideRequest.toRaw());
  });

  routes.post("/:id/bids", async (req, res) => {
    try {
      const bid = await controller.placeBidOnRideRequest(
        req.params.id,
        req.body
      );
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
      const bid = await controller.acceptRideRequestBid(
        req.params.id,
        req.params.bidId
      );
      return res.status(200).send(bid.toRaw());
    }
  );

  return routes;
};
