// import dependencies
import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

// import dtos
import { RegisterRequestDto } from "@/presentation/dtos/auth/register.request.dto";

// import use cases
import { RegisterUseCase } from "@/application/use-cases/auth/register.use-case";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";

/**
 * Auth controller
 * @description Auth controller
 */
@Controller("auth")
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  /**
   * Register a new user
   * @description Register a new user
   * @param registerRequestDto - The register request dto
   * @returns The access token
   */
  @Post("register")
  @ApiBody({ type: RegisterRequestDto })
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    const accessToken: string = await this.registerUseCase.execute(
      new UsernameValueObject(registerRequestDto.username),
      new EmailValueObject(registerRequestDto.email),
      new PasswordValueObject(registerRequestDto.password),
    );

    return { accessToken };
  }
}
