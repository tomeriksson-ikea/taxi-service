import { ValidationError, Validator } from "./Validator";
import { StringValidator } from "./String.validator";

export class NameValidator implements Validator {
  private readonly validator: Validator;

  constructor(stringValidator: StringValidator) {
    this.validator = stringValidator.isNotEmpty();
  }

  validateOrThrow(name: any): void {
    try {
      this.validator.validateOrThrow(name);
    } catch (e) {
      throw new NameValidationError((e as Error).message);
    }
  }
}

class NameValidationError extends ValidationError {
  constructor(message: string) {
    super(`Name validation failed; ${message}`);
    this.name = "NameValidationError";
  }
}
