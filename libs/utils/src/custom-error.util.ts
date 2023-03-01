export class CustomError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
