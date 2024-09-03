import { Request, Router } from "express";
import { RideRequestController } from "../../domain/entities/RideRequest/RideRequest.controller";
import { Responder } from "../utils/Responder";

export const rideRequestHandlers = (
  controller: RideRequestController
): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const rideRequest = await controller.createRideRequest(req.body);
    return new Responder(res).created(rideRequest.toRaw());
  });

  routes.get("/:id", async (req, res, next) => {
    try {
      const rideRequest = await controller.getRideRequest(req.params.id);
      return new Responder(res).created(rideRequest.toRaw());
    } catch (e) {
      next(e);
    }
  });

  routes.post("/:id/bids", async (req, res, next) => {
    try {
      const bid = await controller.placeBidOnRideRequest(
        req.params.id,
        req.body
      );
      return new Responder(res).created(bid.toRaw());
    } catch (e) {
      next(e);
    }
  });

  routes.post(
    "/:id/bids/:bidId/accept",
    async (req: Request<{ id: string; bidId: string }>, res) => {
      const bid = await controller.acceptRideRequestBid(
        req.params.id,
        req.params.bidId
      );
      return new Responder(res).ok(bid.toRaw());
    }
  );

  return routes;
};
