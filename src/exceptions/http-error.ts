export class HttpError {
  public message: unknown;
  public code: number;

  constructor(code: number, message: unknown) {
    this.message = message;
    this.code = code;
  }

  static badRequest(message?: unknown) {
    return new HttpError(400, message ?? "Requisição criada incorretamente");
  }

  static notAuthorized(message?: unknown) {
    return new HttpError(401, message ?? "Nível de permissão insuficiente");
  }

  static forbidden(message?: unknown) {
    return new HttpError(403, message ?? "Você é um criminoso(a)");
  }

  static notFound(message?: unknown) {
    return new HttpError(404, message ?? "Não encontrado");
  }

  static notAcceptable(message?: unknown) {
    return new HttpError(406, message ?? "Inaceitável");
  }

  static requestTimeout(message?: unknown) {
    return new HttpError(408, message ?? "2000 anos depois...");
  }

  static conflict(message?: unknown) {
    return new HttpError(409, message ?? "Conflito");
  }

  static gone(message?: unknown) {
    return new HttpError(410, message ?? "Gone! Reduced to atoms");
  }

  static lengthRequired(message?: unknown) {
    return new HttpError(411, message ?? "Tamanho requerido");
  }

  static preconditionFailed(message?: unknown) {
    return new HttpError(412, message ?? "Prerrequisito falhou");
  }

  static payloadTooLarge(message?: unknown) {
    return new HttpError(413, message ?? "Prerrequisito falhou");
  }

  static unsupportedMediaType(message?: unknown) {
    return new HttpError(415, message ?? "Fotos.exe não vai rolar");
  }

  static expectationFailed(message?: unknown) {
    return new HttpError(417, message ?? "Expectativa falha");
  }

  static teapot(message?: unknown) {
    return new HttpError(418, message ?? "FIIIIIIIIIIIIIIIIIIII");
  }

  static enhanceYourCalm(message?: unknown) {
    return new HttpError(420, message ?? "Se acalma irmã(o)");
  }

  static tokenExpired(message?: unknown) {
    return new HttpError(498, message ?? "Token inválido ou expirado");
  }

  static notImplemented(message?: unknown) {
    return new HttpError(498, message ?? "Não implementado");
  }
}
