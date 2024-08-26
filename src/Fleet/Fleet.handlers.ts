import { Router } from "express";
import { FleetRepository } from "./Fleet.repository";
import { Fleet } from "./Fleet";

export const fleetHandlers = (fleetRepository: FleetRepository): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const fleet = new Fleet(req.body);

    await fleetRepository.create(fleet);

    return res.status(201).send(fleet.toRaw());
  });

  return routes;
};
