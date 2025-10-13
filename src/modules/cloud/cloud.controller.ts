// import dependencies
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Delete,
  Body,
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
import { ImagesService } from "@modules/images/images.service";

// import dto
import { FileUploadResponseDto } from "@/modules/cloud/dto/file-upload-response.dto";
import { FileDeleteRequestDto } from "@/modules/cloud/dto/file-delete-request.dto";
import { FileDeleteResponseDto } from "@/modules/cloud/dto/file-delete-response.dto";

@ApiTags("Cloud")
@Controller("cloud")
export class CloudController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imagesService: ImagesService,
  ) {}

  /**
   * Delete a file from cloud
   * @param fileDeleteRequestDto - The file delete request
   * @returns The file delete response
   */
  @ApiOperation({ summary: "Delete a file from cloud" })
  @ApiBody({ type: FileDeleteRequestDto })
  @ApiOkResponse({ type: FileDeleteResponseDto })
  @ApiBadRequestResponse({ description: "File is required" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Delete("")
  async deleteFile(
    @Body() fileDeleteRequestDto: FileDeleteRequestDto,
  ): Promise<FileDeleteResponseDto> {
    const fileUrl: string = fileDeleteRequestDto.file_url;
    const fileDeleteResponseDto: boolean = await this.s3Service.delete(fileUrl);
    return {
      success: fileDeleteResponseDto,
    };
  }

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
  @Post("file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    const fileUrl: string = await this.s3Service.upload(
      file.buffer,
      file.mimetype,
      "file",
    );

    return {
      file_url: fileUrl,
      success: true,
    };
  }

  /**
   * Upload an avatar image to S3
   * @param file - The avatar image to upload
   * @returns The avatar image url
   */
  @ApiOperation({ summary: "Upload an avatar image to cloud" })
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
  @Post("avatar")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException("File is not an image"), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    // compress the image
    const compressedImage: Buffer = await this.imagesService.compressAvatar(
      file.buffer,
    );
    // upload the image to S3
    const fileUrl: string = await this.s3Service.upload(
      compressedImage,
      "image/jpeg",
      "avatar",
    );
    // return the file url
    return {
      file_url: fileUrl,
      success: true,
    };
  }

  /**
   * Upload an image to S3
   * @param file - The image to upload
   * @returns The image url
   */
  @ApiOperation({ summary: "Upload an image to cloud" })
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
  @Post("image")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException("File is not an image"), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    try {
      // Use default compression options from DTO
      const compressedImage: Buffer = await this.imagesService.compressImage(
        file.buffer,
        {},
      );

      // Determine content type based on original file or default to jpeg
      const contentType = file.mimetype.startsWith("image/")
        ? file.mimetype
        : "image/jpeg";

      const fileUrl: string = await this.s3Service.upload(
        compressedImage,
        contentType,
        "image",
      );
      return {
        file_url: fileUrl,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(
        `Image upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
