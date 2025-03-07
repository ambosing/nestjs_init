import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { TimeUtils } from '../utils/time.utils';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      timestamp: TimeUtils.koreaTime(new Date()),
      statusCode: status,
      path: request.url,
      message: exception?.message || null,
      ip: this.requestIp(request),
    });
  }

  requestIp(request: Request) {
    return request.header['cf-connecting-ip']
      ? request.header['cf-connecting-ip']
      : requestIp.getClientIp(request);
  }
}
