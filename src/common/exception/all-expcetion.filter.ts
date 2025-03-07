import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { TimeUtils } from '../utils/time.utils';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof Error) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response.status(500).json({
        success: false,
        timestamp: TimeUtils.koreaTime(new Date()),
        statusCode: 500,
        path: request.url,
        message: exception?.message || null,
        ip: this.requestIp(request),
      });
    } else {
      if (exception !== null && typeof exception === 'object') {
        this.logger.error(
          `Error type is constructor name: ${
            (exception as any).constructor.name
          }`,
        );
      } else {
        this.logger.error(`Error type is ${typeof exception}`);
      }

      super.catch(exception, host);
    }
  }

  requestIp(request: Request) {
    return request.header['cf-connecting-ip']
      ? request.header['cf-connecting-ip']
      : requestIp.getClientIp(request);
  }
}
