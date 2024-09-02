import { ValidationError, Validator } from "./Validator";
import { StringValidator } from "./String.validator";

export class PhoneValidator implements Validator {
  private readonly validator: Validator;

  constructor(stringValidator: StringValidator) {
    this.validator = stringValidator.isNotEmpty();
  }

  validateOrThrow(name: any): void {
    try {
      this.validator.validateOrThrow(name);
    } catch (e) {
      throw new PhoneValidationError((e as Error).message);
    }
  }
}

class PhoneValidationError extends ValidationError {
  constructor(message: string) {
    super(`Phone validation failed; ${message}`);
    this.name = "PhoneValidationError";
  }
}
