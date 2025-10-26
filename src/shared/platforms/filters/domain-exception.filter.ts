// import dependencies
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

// import exceptions
import { DomainException } from "@shared/domain/exceptions/base.exception";

/**
 * Domain exception filter
 * @description Domain exception filter which will map
 * the domain exceptions to the appropriate HTTP response.
 */
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // map the domain exception to the appropriate HTTP status code
    const httpStatusCode: HttpStatus = exception.getStatus();

    // return the HTTP response
    response.status(httpStatusCode).json({
      statusCode: httpStatusCode,
      error: exception.name,
      message: exception.message,
    });
  }
}
