import { ValidationError } from "./Validator";

export class RequiredFieldsValidator<T> {
  private readonly fields: Array<keyof T>;

  constructor(fields: Array<keyof T>) {
    this.fields = fields;
  }

  validateOrThrow(data: any): void {
    const missingFields = this.fields.filter(
      field => data[field] === undefined
    );

    if (missingFields.length) {
      throw new RequiredFieldsValidationError(
        `Missing fields: ${missingFields.join(", ")}`
      );
    }
  }
}

class RequiredFieldsValidationError extends ValidationError {
  constructor(message: string) {
    super(`Required fields validation failed; ${message}`);
    this.name = "RequiredFieldsValidationError";
  }
}
