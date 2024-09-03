import { ValidationError, Validator } from "./Validator";

type Condition<T> = (value: T) => string | undefined;

export class StringValidator implements Validator {
  private conditions: Condition<string>[] = [];

  public isEmail(): this {
    this.conditions.push(value => {
      const match = value.match(/\S+@\S+\.\S+/);
      if (match === null) {
        return "String is not an email";
      }
    });
    return this;
  }

  public isNotEmpty(): this {
    this.conditions.push(value => {
      if (!value.length) {
        return "String is empty";
      }
    });
    return this;
  }

  public validateOrThrow(value: any): void {
    if (typeof value !== "string") {
      throw new StringValidationError("Value is not a string");
    }
    if (this.conditions.length) {
      const encounteredErrors = this.conditions
        .map(condition => condition(value))
        .filter(Boolean);

      if (encounteredErrors.length) {
        const errorMessage = encounteredErrors.join(", ");
        throw new StringValidationError(errorMessage);
      }
    }
  }
}

class StringValidationError extends ValidationError {
  constructor(message: string) {
    super(`String validation failed; ${message}`);
    this.name = "StringValidationError";
  }
}
