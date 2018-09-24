import { plainToClass } from 'class-transformer';
import { sanitize } from 'class-sanitizer';
import {
  validate as classValidate,
  validateSync as classValidateSync,
} from 'class-validator';
import { ValidationException } from './validation.exception';
import { ClassType } from 'class-transformer/ClassTransformer';

/**
 * Validate value for validator
 * @param {ClassType<T>} validation
 * @param {object} value
 * @return {Promise<T>}
 */
export const validate = async <T>(
  validation: ClassType<T>,
  value: object,
): Promise<T> => {
  // Transform to class
  const entity = plainToClass<T, object>(validation, value);

  // Sanitize
  sanitize(entity);

  // Validate
  const errors = await classValidate(entity, {
    skipMissingProperties: true,
    whitelist: true,
  });
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }

  return entity;
};

/**
 * Validate value for validator without async validators
 * @param {ClassType<T>} validation
 * @param {object} value
 * @return {T}
 */
export const validateSync = <T>(validation: ClassType<T>, value: object): T => {
  // Transform to class
  const entity = plainToClass<T, object>(validation, value);

  // Sanitize
  sanitize(entity);

  // Validate
  const errors = classValidateSync(entity, {
    skipMissingProperties: true,
    whitelist: true,
  });
  if (errors.length > 0) throw new ValidationException(errors);

  return entity;
};
