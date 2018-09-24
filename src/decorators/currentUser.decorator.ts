import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, req: any): any => {
    // TODO CHANGE TO USER WHEN USER IS DONE
    return req.user;
  },
);
