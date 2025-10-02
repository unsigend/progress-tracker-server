// import dependencies
import { Injectable } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// import services
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  /**
   * Constructor for initializing the AWS S3 service
   */
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get("s3.AWS_S3_REGION"),
      credentials: {
        accessKeyId: this.configService.get("s3.AWS_S3_ACCESS_KEY")!,
        secretAccessKey: this.configService.get("s3.AWS_S3_SECRET_KEY")!,
      },
    });
    this.bucketName = this.configService.get("s3.AWS_S3_BUCKET_NAME")!;
  }

  /**
   * Upload a file to AWS S3
   * @param file - The file to upload
   * @returns The file url
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // generate a unique file name: current timestamp + original file name
    const fileName = `${Date.now()}-${file.originalname}`;

    // upload the file to S3
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    let fileUrl = "https://";
    fileUrl += this.bucketName;
    fileUrl += ".s3.";
    fileUrl += this.configService.get("s3.AWS_S3_REGION")!;
    fileUrl += ".amazonaws.com/";
    fileUrl += fileName;
    return fileUrl;
  }

  /**
   * Delete a file from AWS S3
   * @param fileUrl - The url of the file to delete
   * @returns Whether the file was deleted successfully
   */
  async deleteFile(fileUrl: string): Promise<boolean> {
    // Extract the file name/key from the full URL
    const fileName = fileUrl.split("/").pop();
    if (!fileName) {
      return false;
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });
    await this.s3Client.send(deleteCommand);
    return true;
  }
}
