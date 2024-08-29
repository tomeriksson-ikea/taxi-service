import { Validator } from "./Validator";
import { BadRequestError } from "../errors/Errors";

export class ClientValidator implements Validator {
  validateOrThrow(body: any): void {
    if (typeof body.name !== "string") {
      throw new BadRequestError("Client name must be of type string");
    }

    if (!body.email.match(/\S+@\S+\.\S+/)) {
      throw new BadRequestError("Client email not valid email");
    }

    if (typeof body.phone !== "string") {
      throw new BadRequestError("Client phone must be of type string");
    }
  }
}
