export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
  }
}

export class ValidationError extends BadRequestError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class StringValidationError extends ValidationError {
  constructor(message: string) {
    super(`String validation failed; ${message}`);
    this.name = "StringValidationError";
  }
}

export class ClientValidationError extends ValidationError {
  constructor(message: string) {
    super(`Client validation failed; ${message}`);
    this.name = "ClientValidationError";
  }
}

export class EmailValidationError extends ValidationError {
  constructor(message: string) {
    super(`Email validation failed; ${message}`);
    this.name = "EmailValidationError";
  }
}

export class RequiredFieldsValidationError extends ValidationError {
  constructor(message: string) {
    super(`Required fields validation failed; ${message}`);
    this.name = "RequiredFieldsValidationError";
  }
}
