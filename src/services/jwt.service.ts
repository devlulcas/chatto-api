import { SignOptions, sign, VerifyOptions, verify } from "jsonwebtoken";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Payload } from "../types/payload";

export class JWTService {
  private privateKeyPath: string;
  private privateKey: Buffer;
  private publicKeyPath: string;
  private publicKey: Buffer;
  private expiresIn: string;

  constructor() {
    this.privateKeyPath = join(__dirname, "../../../jwt.key");
    this.privateKey = readFileSync(this.privateKeyPath);
    this.expiresIn = process.env.JWT_EXPIRATION || "1h";
    this.publicKeyPath = join(__dirname, "../../../jwt.key.pub");
    this.publicKey = readFileSync(this.publicKeyPath);
  }

  /**
   * Gera um token JWT assinado
   *
   * @param payload Objeto com informações de payload para usar depois
   * @returns Token assinado
   */
  createToken(payload: Payload): string {
    const signOptions: SignOptions = {
      algorithm: "RS256",
      expiresIn: this.expiresIn,
    };

    return sign(payload, this.privateKey, signOptions);
  }

  /**
   * Válida o token e retorna o objeto de payload. Caso o token seja inválido uma exceção será lançada
   *
   * @param token String do token JWT assinado
   * @returns Uma promise contendo o payload que estava guardado no token
   */
  validadeToken(token: string): Promise<Payload> {
    const verifyOptions: VerifyOptions = {
      algorithms: ["RS256"],
    };

    return new Promise((resolve, reject) => {
      verify(token, this.publicKey, verifyOptions, (error, decoded) => {
        if (error) return reject(error);

        const data = decoded as Payload;

        resolve(data);
      });
    });
  }
}
