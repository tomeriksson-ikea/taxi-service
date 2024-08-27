export interface Validator {
  validateOrThrow(body: any): void;
}
