import { BadRequestError } from "../errors/Errors";

export interface Validator {
  validateOrThrow(value: any): void;
}

export class ValidationError extends BadRequestError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
