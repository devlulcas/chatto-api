import bcrypt from 'bcryptjs';

export type ICrypto = {
  hashPassword(password: string): Promise<string>;
  checkPassword(password: string, hashedPassword: string): Promise<boolean>;
};

export class Crypto implements ICrypto {
  public async hashPassword(password: string) {
    return bcrypt.hash(password, 8);
  }

  public async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
