import { IsEmail, IsNotEmpty } from "class-validator";
/**
 * Send code request DTO
 * @description Send code request DTO which is used to validate the send code request.
 */
export class SendCodeRequestDto {
  /** The email of the user */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
