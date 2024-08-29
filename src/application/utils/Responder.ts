import { Response } from "express";

type ErrorResponseBody = {
  message: string;
  error: string;
};
export class Responder {
  private response: Response;
  constructor(response: Response) {
    this.response = response;
  }

  ok(body: any) {
    return this.response.status(200).send(body);
  }

  created(body: any) {
    return this.response.status(201).send(body);
  }

  notFound(body: ErrorResponseBody) {
    return this.response.status(404).send(body);
  }

  badRequest(body: ErrorResponseBody) {
    return this.response.status(400).send(body);
  }

  internalServerError(body: ErrorResponseBody) {
    return this.response.status(500).send(body);
  }
}
