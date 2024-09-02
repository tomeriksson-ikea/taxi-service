import { ValidationError, Validator } from "./Validator";

export class ClientValidator implements Validator {
  private readonly requiredFieldsValidator: Validator;
  private readonly emailValidator: Validator;
  private readonly nameValidator: Validator;
  private readonly phoneValidator: Validator;

  constructor(
    requiredFieldsValidator: Validator,
    emailValidator: Validator,
    nameValidator: Validator,
    phoneValidator: Validator
  ) {
    this.requiredFieldsValidator = requiredFieldsValidator;
    this.emailValidator = emailValidator;
    this.nameValidator = nameValidator;
    this.phoneValidator = phoneValidator;
  }

  validateOrThrow(client: any): void {
    try {
      this.requiredFieldsValidator.validateOrThrow(client);
      this.emailValidator.validateOrThrow(client.email);
      this.nameValidator.validateOrThrow(client.name);
      this.phoneValidator.validateOrThrow(client.phone);
    } catch (e) {
      throw new ClientValidationError((e as Error).message);
    }
  }
}

class ClientValidationError extends ValidationError {
  constructor(message: string) {
    super(`Client validation failed; ${message}`);
    this.name = "ClientValidationError";
  }
}
