// import dependencies
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

// import services
import { S3Service } from "@modules/S3/S3.service";

// import dto
import { FileUploadResponseDto } from "@modules/file/dto/file-upload-response.dto";

@ApiTags("File")
@Controller("file")
export class FileController {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * Upload a file to S3
   * @param file - The file to upload
   * @returns The file url
   */
  @ApiOperation({ summary: "Upload a file to cloud" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: FileUploadResponseDto })
  @ApiBadRequestResponse({ description: "File is required" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    if (!file) {
      throw new BadRequestException("File is required");
    }
    const fileUrl: string = await this.s3Service.uploadFile(file);

    // return the file url
    return {
      file_url: fileUrl,
      success: true,
    };
  }
}
