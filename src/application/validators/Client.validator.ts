import { Validator } from "./Validator";

export class ClientValidator implements Validator {
  validateOrThrow(body: any): void {
    if (typeof body.name !== "string") {
      throw new Error("Invalid client: Client name must be of type string");
    }

    if (!body.email.match(/\S+@\S+\.\S+/)) {
      throw new Error("Invalid client: Client email not valid email");
    }

    if (typeof body.phone !== "string") {
      throw new Error("Invalid client: Client phone must be of type string");
    }
  }
}
