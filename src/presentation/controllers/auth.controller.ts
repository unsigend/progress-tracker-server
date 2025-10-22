// import dependencies
import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

// import dtos
import { RegisterRequestDto } from "@/presentation/dtos/auth/register.request.dto";
import { LoginRequestDto } from "@/presentation/dtos/auth/login.request.dto";
import { AccessTokenResponseDto } from "@/presentation/dtos/auth/access-token.response.dto";

// import use cases
import { RegisterUseCase } from "@/application/use-cases/auth/register.use-case";
import { LoginUseCase } from "@/application/use-cases/auth/login.use-case";
import { EmailCheckUseCase } from "@/application/use-cases/auth/email-check.use-case";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";
import { EmailCheckResponseDto } from "@/presentation/dtos/auth/email-check.response.dto";

/**
 * Auth controller
 * @description Auth controller
 */
@Controller("auth")
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly emailCheckUseCase: EmailCheckUseCase,
  ) {}

  /**
   * Register a new user
   * @description Register a new user
   * @param registerRequestDto - The register request dto
   * @returns The access token
   */
  @Post("register")
  @ApiBody({ type: RegisterRequestDto })
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: AccessTokenResponseDto,
  })
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

  /**
   * Login a user
   * @description Login a user
   * @param loginRequestDto - The login request dto
   * @returns The access token
   */
  @Post("login")
  @ApiBody({ type: LoginRequestDto })
  @ApiOperation({ summary: "Login a user" })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully",
    type: AccessTokenResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const accessToken: string = await this.loginUseCase.execute(
      new EmailValueObject(loginRequestDto.email),
      new PasswordValueObject(loginRequestDto.password),
    );

    return { accessToken };
  }

  /**
   * Check if an email exists
   * @description Check if an email exists
   * @param email - The email to check
   * @returns The email check response dto
   */
  @Get("email-check/:email")
  @ApiOperation({ summary: "Check if an email exists" })
  @ApiResponse({
    status: 200,
    description: "Email exists",
    type: EmailCheckResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async emailCheck(@Param("email") email: string) {
    const exists: boolean = await this.emailCheckUseCase.execute(
      new EmailValueObject(email),
    );
    return { exists: exists };
  }
}
