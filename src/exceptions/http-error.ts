type FieldError = Record<string, string[] | undefined> | null

export type HttpErrorData = {
  message?: string;
  fieldErrors?: FieldError;
};
export class HttpError extends Error {
  public code: number;
  public fieldErrors?: FieldError;

  constructor(code: number, message: string, fieldErrors?: FieldError) {
    super(message as string);
    this.code = code;
    this.fieldErrors = fieldErrors;
  }

  static badRequest(data?: HttpErrorData) {
    return new HttpError(
      400,
      data?.message ?? "Requisição criada incorretamente",
      data?.fieldErrors
    );
  }

  static notAuthorized(data?: HttpErrorData) {
    return new HttpError(
      401,
      data?.message ?? "Nível de permissão insuficiente",
      data?.fieldErrors
    );
  }

  static forbidden(data?: HttpErrorData) {
    return new HttpError(
      403,
      data?.message ?? "Você é um criminoso(a)",
      data?.fieldErrors
    );
  }

  static notFound(data?: HttpErrorData) {
    return new HttpError(
      404,
      data?.message ?? "Não encontrado",
      data?.fieldErrors
    );
  }

  static notAcceptable(data?: HttpErrorData) {
    return new HttpError(406, data?.message ?? "Inaceitável", data?.fieldErrors);
  }

  static requestTimeout(data?: HttpErrorData) {
    return new HttpError(
      408,
      data?.message ?? "2000 anos depois...",
      data?.fieldErrors
    );
  }

  static conflict(data?: HttpErrorData) {
    return new HttpError(409, data?.message ?? "Conflito", data?.fieldErrors);
  }

  static gone(data?: HttpErrorData) {
    return new HttpError(
      410,
      data?.message ?? "Gone! Reduced to atoms",
      data?.fieldErrors
    );
  }

  static lengthRequired(data?: HttpErrorData) {
    return new HttpError(
      411,
      data?.message ?? "Tamanho requerido",
      data?.fieldErrors
    );
  }

  static preconditionFailed(data?: HttpErrorData) {
    return new HttpError(
      412,
      data?.message ?? "Prerrequisito falhou",
      data?.fieldErrors
    );
  }

  static payloadTooLarge(data?: HttpErrorData) {
    return new HttpError(
      413,
      data?.message ?? "Prerrequisito falhou",
      data?.fieldErrors
    );
  }

  static unsupportedMediaType(data?: HttpErrorData) {
    return new HttpError(
      415,
      data?.message ?? "Fotos.exe não vai rolar",
      data?.fieldErrors
    );
  }

  static expectationFailed(data?: HttpErrorData) {
    return new HttpError(
      417,
      data?.message ?? "Expectativa falha",
      data?.fieldErrors
    );
  }

  static teapot(data?: HttpErrorData) {
    return new HttpError(
      418,
      data?.message ?? "FIIIIIIIIIIIIIIIIIIII",
      data?.fieldErrors
    );
  }

  static enhanceYourCalm(data?: HttpErrorData) {
    return new HttpError(
      420,
      data?.message ?? "Se acalma irmã(o)",
      data?.fieldErrors
    );
  }

  static tokenExpired(data?: HttpErrorData) {
    return new HttpError(
      498,
      data?.message ?? "Token inválido ou expirado",
      data?.fieldErrors
    );
  }

  static notImplemented(data?: HttpErrorData) {
    return new HttpError(
      498,
      data?.message ?? "Não implementado",
      data?.fieldErrors
    );
  }
}
