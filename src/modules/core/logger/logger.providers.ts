import { LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { createLogger, transports } from 'winston';

export const loggerProviders = [
  {
    provide: LOGGER_WINSTON_PROVIDER,
    useFactory: () => {
      const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

      const winstonTransports = [
        new transports.Console({}),
      ];

      return createLogger({
        level: LOG_LEVEL,
        transports: winstonTransports,
      });
    },
  },
];