import { HttpException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { catchError, throwError } from 'rxjs';

export const grpcToHttpException = catchError(
  (error: { code: number; details: string }) => {
    const httpError = plainToInstance(HttpException, JSON.parse(error.details));
    return throwError(() => httpError);
  },
);
