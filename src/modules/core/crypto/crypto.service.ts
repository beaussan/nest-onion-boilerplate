import { Injectable } from '@nestjs/common';
import { argon2id, hash, verify } from 'argon2';

@Injectable()
export class CryptoService {
  private readonly type = argon2id;

  constructor() {}

  /**
   * Compare hash
   * @param {string} plain
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  public async compare(plain: string, hashString: string): Promise<boolean> {
    return await verify(hashString, plain);
  }

  /**
   * Generate hash
   * @param {string} plain
   * @returns {Promise<string>}
   */
  public async hash(plain: string): Promise<string> {
    return await hash(plain, { type: this.type });
  }
}
