export class HttpError {
  public message: unknown;
  public code: number;

  constructor(code: number, message: unknown) {
    this.message = message;
    this.code = code;
  }
}
