// import dependencies
import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// import decorators
import { Public } from "@/platforms/decorators/public.decorator";

// import dtos
import { RegisterRequestDto } from "@/presentation/dtos/auth/register.request.dto";
import { LoginRequestDto } from "@/presentation/dtos/auth/login.request.dto";

// import use cases
import { RegisterUseCase } from "@/application/use-cases/auth/register.use-case";
import { LoginUseCase } from "@/application/use-cases/auth/login.use-case";
import { EmailCheckUseCase } from "@/application/use-cases/auth/email-check.use-case";

// import value objects
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";
/**
 * Auth controller
 * @description Handles authentication operations
 */
@ApiTags("auth")
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
  @Public()
  @Post("register")
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
   */
  @Public()
  @Post("login")
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const accessToken: string = await this.loginUseCase.execute(
      new EmailValueObject(loginRequestDto.email),
      new PasswordValueObject(loginRequestDto.password),
    );

    return { accessToken };
  }

  /**
   * Check if an email exists
   */
  @Public()
  @Get("email-check/:email")
  async emailCheck(@Param("email") email: string) {
    const exists: boolean = await this.emailCheckUseCase.execute(
      new EmailValueObject(email),
    );
    return { exists: exists };
  }
}
