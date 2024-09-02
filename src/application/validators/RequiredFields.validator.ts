import { RequiredFieldsValidationError } from "../errors/Errors";

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
