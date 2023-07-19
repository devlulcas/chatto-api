import { SignOptions, VerifyOptions, sign, verify } from 'jsonwebtoken';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JWTPayload } from '../types/payload';

export type ITokenGenerator = {
  createToken(payload: JWTPayload): Promise<string>;
  validateToken(token: string): Promise<JWTPayload>;
};

export class JWT implements ITokenGenerator {
  private privateKeyPath: string;
  private privateKey: Buffer;
  private publicKeyPath: string;
  private publicKey: Buffer;
  private expiresIn: string;

  constructor() {
    this.privateKeyPath = join(__dirname, 'jwt.key');
    this.publicKeyPath = join(__dirname, 'jwt.key.pub');

    console.table({
      privateKeyPath: this.privateKeyPath,
      publicKeyPath: this.publicKeyPath,
    });

    if (existsSync(this.privateKeyPath) === false) {
      throw new Error('Private key not found');
    }

    if (existsSync(this.publicKeyPath) === false) {
      throw new Error('Public key not found');
    }

    this.privateKey = readFileSync(this.privateKeyPath);
    this.publicKey = readFileSync(this.publicKeyPath);
    this.expiresIn = process.env.JWT_EXPIRATION || '1h';
  }

  /**
   * Gera um token JWT assinado
   *
   * @param payload Objeto com informações de payload para usar depois
   * @returns Token assinado
   */
  createToken(payload: JWTPayload) {
    const signOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: this.expiresIn,
    };

    return new Promise<string>((resolve, reject) => {
      sign(payload, this.privateKey, signOptions, (error, token) => {
        if (error || !token) return reject(error);
        resolve(token);
      });
    });
  }

  /**
   * Válida o token e retorna o objeto de payload. Caso o token seja inválido uma exceção será lançada
   *
   * @param token String do token JWT assinado
   * @returns Uma promise contendo o payload que estava guardado no token
   */
  validateToken(token: string) {
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256'],
    };

    return new Promise<JWTPayload>((resolve, reject) => {
      verify(token, this.publicKey, verifyOptions, (error, decoded) => {
        if (error) return reject(error);

        if (!this.isJWTPayload(decoded)) {
          return reject(new Error('Invalid JWT Payload'));
        }

        const data: JWTPayload = {
          sub: decoded.sub,
          name: decoded.name,
          role: decoded.role,
        };

        resolve(data);
      });
    });
  }

  private isJWTPayload(decoded: any): decoded is JWTPayload {
    return typeof decoded === 'object' && typeof decoded.sub !== 'undefined';
  }
}
