import { Injectable } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { config as parseConfig } from 'dotenv';

interface EnvConfig {
  [key: string]: any;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    try {
      parseConfig();
    } catch (e) {}

    this.envConfig = this.validateInput(process.env);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      API_PORT: Joi.number().default(3000),
      LOG_LEVEL: Joi.string()
        .valid('error', 'warning', 'info', 'debug', 'silly')
        .default('debug'),
      DATABASE_URL: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      LOG_SQL_REQUEST: Joi.boolean().default(false),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
      {
        stripUnknown: true,
      },
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get databaseUrl(): string {
    return this.envConfig.DATABASE_URL;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get isLoggingDb(): boolean {
    return this.envConfig.LOG_SQL_REQUEST;
  }

  get loggerLevel(): string {
    return this.envConfig.LOG_LEVEL;
  }

  get port(): number {
    return this.envConfig.API_PORT;
  }
}
