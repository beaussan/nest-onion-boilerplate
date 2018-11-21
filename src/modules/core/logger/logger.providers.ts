import { LOGGER_LEVEL, LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { createLogger, transports, format } from 'winston';

export const loggerProviders = [
  {
    provide: LOGGER_WINSTON_PROVIDER,
    useFactory: () => {
      const LOG_LEVEL = LOGGER_LEVEL.DEBUG;

      const winstonTransports = [new transports.Console({})];

      const winstonFormaters = format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.align(),
        format.printf(
          info =>
            `[Nest] ${process.pid} - ${info.timestamp} ${
              info.level
            }: ${info.message.trim()}`,
        ),
      );

      return createLogger({
        level: LOG_LEVEL,
        transports: winstonTransports,
        format: winstonFormaters,
      });
    },
  },
];
