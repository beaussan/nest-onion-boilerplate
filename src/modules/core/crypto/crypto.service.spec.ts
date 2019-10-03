import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import * as argon from 'argon2';

describe('CryptoService', () => {
  let service: CryptoService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();
    service = module.get<CryptoService>(CryptoService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a password and verify if it is correct', async () => {
    const toHash = 'some random string';

    const hashed = await service.hash(toHash);

    expect(await service.compare(toHash, hashed)).toBeTruthy();
  });

  it('should hash a password and return false if not same password', async () => {
    const toHash = 'some random string';

    const hashed = await service.hash(toHash);

    expect(await service.compare(toHash + 'A', hashed)).toBeFalsy();
  });
});
