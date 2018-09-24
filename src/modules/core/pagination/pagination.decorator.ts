import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { VPagination } from './pagination.validation';
import { validateSync } from '../validation/validation.util';

export const Pagination = createParamDecorator(
  (data: any, req: Request): VPagination => {
    return validateSync(VPagination, req.query);
  },
);
