import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { expand } from 'rxjs/operators';

describe('ConfigService', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const loadService = async (): Promise<ConfigService> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    return module.get<ConfigService>(ConfigService);
  };

  it('should have default values', async () => {
    const dbUrl = 'gotodb please';
    const jwtSecrets = 'shhhh, secret';

    // set the variables
    process.env.NODE_ENV = undefined;
    process.env.API_PORT = undefined;
    process.env.API_PROTOCOL = undefined;
    process.env.LOG_LEVEL = undefined;
    process.env.LOG_SQL_REQUEST = undefined;
    process.env.DATABASE_URL = dbUrl;
    process.env.JWT_SECRET = jwtSecrets;

    const configService = await loadService();

    expect(configService.nodeEnv).toEqual('development');
    expect(configService.port).toEqual(3000);
    expect(configService.loggerLevel).toEqual('debug');
    expect(configService.databaseUrl).toEqual(dbUrl);
    expect(configService.jwtSecret).toEqual(jwtSecrets);
    expect(configService.isLoggingDb).toEqual(false);
  });

  it('should error when no db url set', async () => {
    const jwtSecrets = 'shhhh, secret';

    // set the variables
    process.env.NODE_ENV = undefined;
    process.env.API_PORT = undefined;
    process.env.API_PROTOCOL = undefined;
    process.env.LOG_LEVEL = undefined;
    process.env.LOG_SQL_REQUEST = undefined;
    process.env.DATABASE_URL = undefined;
    process.env.JWT_SECRET = jwtSecrets;

    try {
      const configService = await loadService();
      fail();
    } catch (e) {
      expect(e.message).toEqual(
        'Config validation error: "DATABASE_URL" is required',
      );
    }
  });

  it('should error when no jwt token url set', async () => {
    const dbUrl = 'gotodb please';

    // set the variables
    process.env.NODE_ENV = undefined;
    process.env.API_PORT = undefined;
    process.env.API_PROTOCOL = undefined;
    process.env.LOG_LEVEL = undefined;
    process.env.LOG_SQL_REQUEST = undefined;
    process.env.DATABASE_URL = dbUrl;
    process.env.JWT_SECRET = undefined;

    try {
      const configService = await loadService();
      fail();
    } catch (e) {
      expect(e.message).toEqual(
        'Config validation error: "JWT_SECRET" is required',
      );
    }
  });

  it('should set correct values', async () => {
    const dbUrl = 'gotodb please';
    const jwtSecrets = 'shhhh, secret';
    const nodeEnv = 'test';
    const apiPort = 2020;
    const logLevel = 'silly';
    const logSqlRequest = true;

    // set the variables
    process.env.NODE_ENV = nodeEnv;
    process.env.API_PORT = `${apiPort}`;
    process.env.LOG_LEVEL = logLevel;
    process.env.LOG_SQL_REQUEST = `${logSqlRequest}`;
    process.env.DATABASE_URL = dbUrl;
    process.env.JWT_SECRET = jwtSecrets;

    const configService = await loadService();

    expect(configService.nodeEnv).toEqual(nodeEnv);
    expect(configService.port).toEqual(apiPort);
    expect(configService.loggerLevel).toEqual(logLevel);
    expect(configService.databaseUrl).toEqual(dbUrl);
    expect(configService.jwtSecret).toEqual(jwtSecrets);
    expect(configService.isLoggingDb).toEqual(logSqlRequest);
  });
});
