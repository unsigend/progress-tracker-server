// import dependencies
import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { Public } from "@shared/platforms/decorators/public.decorator";

// import use cases
import { RegisterUseCase } from "../../application/use-case/register.use-case";
import { LoginUseCase } from "../../application/use-case/login.use-case";
import { RegisterRequestDto } from "../dtos/register.request.dto";
import { AccessTokenResponseDto } from "../dtos/access-token.response.dto";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { LoginRequestDto } from "../dtos/login.request.dto";
import { EmailCheckUseCase } from "../../application/use-case/email-check.use-case";

/**
 * Auth controller
 * @description Auth controller which is used to handle the auth requests
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
   */
  @Post("register")
  @Public()
  public async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<AccessTokenResponseDto> {
    const accessToken: string = await this.registerUseCase.execute(
      registerRequestDto.username,
      new EmailValueObject(registerRequestDto.email),
      new PasswordValueObject(registerRequestDto.password),
    );

    return { accessToken };
  }

  /**
   * Login a user
   */
  @Post("login")
  @Public()
  public async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<AccessTokenResponseDto> {
    const accessToken: string = await this.loginUseCase.execute(
      new EmailValueObject(loginRequestDto.email),
      new PasswordValueObject(loginRequestDto.password),
    );

    return { accessToken };
  }

  /**
   * Logout a user
   */
  @Post("logout")
  @Public()
  public logout(): { success: boolean } {
    // Nothing to be done in current implementation
    return { success: true };
  }

  /**
   * Check if an email is already in use
   */
  @Get("email-check/:email")
  @Public()
  public async emailCheck(
    @Param("email") email: string,
  ): Promise<{ exists: boolean }> {
    const isEmailInUse: boolean = await this.emailCheckUseCase.execute(
      new EmailValueObject(email),
    );
    return { exists: isEmailInUse };
  }
}
