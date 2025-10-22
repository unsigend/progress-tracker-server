// import dependencies
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// import value objects
import { FileValueObject } from "@domain/value-objects/common/file.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";

// import services
import { ICloud } from "@domain/services/cloud.interface";
import { ConfigService } from "@nestjs/config";

/**
 * AWS S3 Cloud Service
 * @description AWS S3 Cloud Service
 */
@Injectable()
export class AwsS3CloudService implements ICloud {
  private readonly awsS3AccessKey: string;
  private readonly awsS3SecretKey: string;
  private readonly awsS3Region: string;
  private readonly awsS3BucketName: string;
  private readonly s3Client: S3Client;

  /**
   * Constructor
   * @param configService - Injectable configuration service
   */
  constructor(private readonly configService: ConfigService) {
    this.awsS3AccessKey = this.configService.get<string>(
      "awsS3CloudConfig.AWS_S3_ACCESS_KEY",
    )!;
    this.awsS3SecretKey = this.configService.get<string>(
      "awsS3CloudConfig.AWS_S3_SECRET_KEY",
    )!;
    this.awsS3Region = this.configService.get<string>(
      "awsS3CloudConfig.AWS_S3_REGION",
    )!;
    this.awsS3BucketName = this.configService.get<string>(
      "awsS3CloudConfig.AWS_S3_BUCKET_NAME",
    )!;
    this.s3Client = new S3Client({
      region: this.awsS3Region,
      credentials: {
        accessKeyId: this.awsS3AccessKey,
        secretAccessKey: this.awsS3SecretKey,
      },
    });
  }

  /**
   * Upload a file to the cloud and return the URL
   * @description Upload a file to the cloud
   * @param file - The file to be uploaded
   * @returns The URL value object of the uploaded file
   */
  async upload(file: FileValueObject): Promise<UrlValueObject> {
    // generate a unique file name using the UUID v4
    const fileName: string = `${uuidv4()}.${file.getExtension()}`;

    // create the command to upload the file to the S3 bucket
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: this.awsS3BucketName,
      Key: fileName,
      Body: file.getBuffer(),
      ContentType: file.getMimeType(),
    });

    // upload the file to the S3 bucket
    await this.s3Client.send(command);

    // return the URL of the uploaded file
    let url = "https://";
    url += `${this.awsS3BucketName}.s3.${this.awsS3Region}.amazonaws.com/`;
    url += fileName;
    return new UrlValueObject(url);
  }

  /**
   * Delete an image from the cloud
   * @description Delete an image from the cloud
   * @param url - The URL of the image to be deleted
   * @returns void
   */
  async deleteImage(url: UrlValueObject): Promise<void> {
    // extract the file name from the URL
    const fileName = url.getValue().split("/").pop();

    // create the command to delete the file from the S3 bucket
    const command: DeleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.awsS3BucketName,
      Key: fileName,
    });

    // delete the file from the S3 bucket
    await this.s3Client.send(command);
  }
}
