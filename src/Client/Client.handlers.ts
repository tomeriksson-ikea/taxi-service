import { Router } from "express";
import { ClientRepository } from "./Client.repository";
import { Client } from "./Client";

export const clientHandlers = (clientRepository: ClientRepository): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    const client = new Client(req.body);

    await clientRepository.create(client);

    return res.status(201).send(client.toRaw());
  });

  return routes;
};
