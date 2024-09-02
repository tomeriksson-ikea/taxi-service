import { Validator } from "./Validator";
import { EmailValidationError } from "../errors/Errors";
import { StringValidator } from "./String.validator";

export class EmailValidator implements Validator {
  private readonly validator: Validator;

  constructor(stringValidator: StringValidator) {
    this.validator = stringValidator.isNotEmpty().isEmail();
  }

  validateOrThrow(email: any): void {
    try {
      this.validator.validateOrThrow(email);
    } catch (e) {
      throw new EmailValidationError((e as Error).message);
    }
  }
}
