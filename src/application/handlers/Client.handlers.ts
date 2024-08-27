import { Router } from "express";
import { ClientController } from "../../domain/Client/Client.controller";
import { Validator } from "../validators/Validator";

export const clientHandlers = (
  controller: ClientController,
  validator: Validator
): Router => {
  const routes = Router();

  routes.post("/", async (req, res) => {
    try {
      validator.validateOrThrow(req.body);

      const client = await controller.createClient(req.body);
      return res.status(201).send(client.toRaw());
    } catch (e) {
      return res.status(400).send({ error: (e as Error).message });
    }
  });

  return routes;
};
