// import dependencies
import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { Type } from "@nestjs/common";

/**
 * Api standard response decorator
 * @description Api standard response decorator which is used to return the API standard response.
 */
export function ApiStandardResponse(dto: Type<any>, isArray: boolean = false) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: "Success",
      type: dto,
      isArray: isArray,
    }),
    ApiResponse({
      status: 400,
      description: "Bad Request",
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
    }),
    ApiResponse({
      status: 403,
      description: "Forbidden",
    }),
    ApiResponse({
      status: 404,
      description: "Not Found",
    }),
    ApiResponse({
      status: 500,
      description: "Internal Server Error",
    }),
  );
}
