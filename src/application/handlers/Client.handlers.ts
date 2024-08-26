import { Router } from "express";
import { ClientController } from "../../domain/Client/Client.controller";

export const clientHandlers = (controller: ClientController): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const client = await controller.createClient(req.body);

    return res.status(201).send(client.toRaw());
  });

  return routes;
};
