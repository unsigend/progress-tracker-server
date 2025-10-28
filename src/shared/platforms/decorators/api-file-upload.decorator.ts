// import dependencies
import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";

/**
 * Options for the ApiFileUpload decorator
 */
interface ApiFileUploadOptions {
  /**
   * The name of the field that contains the file
   */
  fieldName: string;
  /**
   * The summary for the API operation
   */
  summary?: string;
  /**
   * Whether the file is required
   */
  required?: boolean;
}

/**
 * Decorator to configure a file upload endpoint for Swagger and NestJS
 * @param options - The options for the file upload
 * @returns A composed decorator
 */
export function ApiFileUpload(options: ApiFileUploadOptions) {
  const { fieldName, summary, required = true } = options;

  return applyDecorators(
    ApiOperation({ summary: summary || `Upload a ${fieldName}` }),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
    UseInterceptors(FileInterceptor(fieldName)),
  );
}
