import { Router } from "express";
import { FleetController } from "../../domain/entities/Fleet/Fleet.controller";

export const fleetHandlers = (controller: FleetController): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const fleet = await controller.createFleet(req.body);

    return res.status(201).send(fleet.toRaw());
  });

  return routes;
};
