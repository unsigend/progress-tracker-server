// import dependencies
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

// import exceptions
import { DomainException } from "@domain/exceptions/domain-exception";
import { ValidationException } from "@domain/exceptions/validation-exception";
import { ConflictException } from "@domain/exceptions/conflict-exception";
import { NotFoundException } from "@domain/exceptions/not-found-exception";
import { UnauthorizedException } from "@domain/exceptions/unauthorized-exception";

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
    const httpStatusCode: HttpStatus = this.mapHttpStatus(exception);

    // return the HTTP response
    response.status(httpStatusCode).json({
      statusCode: httpStatusCode,
      error: exception.name,
      message: exception.message,
    });
  }

  /**
   * Map the domain exception to the appropriate HTTP status code
   * @param exception - The domain exception
   * @returns The appropriate HTTP status code
   */
  private mapHttpStatus(exception: DomainException): HttpStatus {
    if (exception instanceof ValidationException) {
      return HttpStatus.BAD_REQUEST;
    }
    if (exception instanceof ConflictException) {
      return HttpStatus.CONFLICT;
    }
    if (exception instanceof NotFoundException) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof UnauthorizedException) {
      return HttpStatus.UNAUTHORIZED;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
