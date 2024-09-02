export interface Validator {
  validateOrThrow(value: any): void;
}
