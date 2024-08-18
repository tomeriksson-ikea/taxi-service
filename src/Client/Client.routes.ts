import { Router } from "express";

const routes = Router();

routes.post("/", (req, res) => {
  res.status(201).send(req.body);
});

export { routes };
