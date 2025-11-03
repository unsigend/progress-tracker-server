// import dependencies
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Res,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { Public } from "@shared/platforms/decorators/public.decorator";
import { RegisterUseCase } from "../../application/use-case/register.use-case";
import { LoginUseCase } from "../../application/use-case/login.use-case";
import { RegisterRequestDto } from "../dtos/register.request.dto";
import { AccessTokenResponseDto } from "../dtos/access-token.response.dto";
import { EmailValueObject } from "@/modules/user/domain/value-object/email.vo";
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";
import { LoginRequestDto } from "../dtos/login.request.dto";
import { EmailCheckUseCase } from "../../application/use-case/email-check.use-case";
import { EmailCheckResponseDto } from "../dtos/email-check.response.dto";
import { GithubAuthGuard } from "@/shared/platforms/guards/github-auth.guard";
import { UserEntity } from "@/modules/user/domain/entities/user.entity";
import { type Request as ExpressRequest } from "express";
import { type Response as ExpressResponse } from "express";
import {
  type ITokenService,
  TOKEN_SERVICE_TOKEN,
} from "@/modules/auth/domain/services/token.service";
import { ConfigService } from "@nestjs/config";
import { GoogleAuthGuard } from "@/shared/platforms/guards/google-auth.guard";
import { SendCodeRequestDto } from "../dtos/send-code.request.dto";
import { SendCodeResponseDto } from "../dtos/send-code.response.dto";
import { VerifyCodeResponseDto } from "../dtos/verify-code.response.dto";
import { VerifyCodeRequestDto } from "../dtos/verify-code.request.dto";
import { SendCodeUseCase } from "../../application/use-case/send-code.use-case";
import { VerifyCodeUseCase } from "../../application/use-case/verify-code.use-case";
import { ResetPasswordUseCase } from "../../application/use-case/reset-password.use-case";
import { ResetPasswordRequestDto } from "../dtos/reset-password.request.dto";
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
    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
    private readonly configService: ConfigService,
    private readonly sendCodeUseCase: SendCodeUseCase,
    private readonly verifyCodeUseCase: VerifyCodeUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
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
  ): Promise<EmailCheckResponseDto> {
    const isEmailInUse: boolean = await this.emailCheckUseCase.execute(
      new EmailValueObject(email),
    );
    return { isAvailable: !isEmailInUse };
  }

  /**
   * Github login entry point
   */
  @Get("/login/github")
  @Public()
  @UseGuards(GithubAuthGuard)
  public github(): void {
    return;
  }

  /**
   * Google login entry point
   */
  @Get("/login/google")
  @Public()
  @UseGuards(GoogleAuthGuard)
  public google(): void {
    return;
  }

  /**
   * Github callback with access token
   */
  @Get("/login/github/callback")
  @Public()
  @UseGuards(GithubAuthGuard)
  public async githubCallback(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<void> {
    // get the user from the request
    const user: UserEntity = req.user as UserEntity;
    // generate the access token
    const accessToken: string = await this.tokenService.generateAccessToken({
      userId: user.getId().getId(),
      email: user.getEmail().getEmail(),
      role: user.getRole().getRole(),
    });
    // redirect to the frontend
    const frontendUrl: string = this.configService.get<string>(
      "app.APP_FRONTEND_URL",
    )!;
    const postfix: string = this.configService.get<string>(
      "auth.GITHUB_FRONTEND_CALLBACK_POSTFIX",
    )!;
    res.redirect(`${frontendUrl}/${postfix}?accessToken=${accessToken}`);
  }

  /**
   * Google callback with access token
   */
  @Get("/login/google/callback")
  @Public()
  @UseGuards(GoogleAuthGuard)
  public async googleCallback(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ): Promise<void> {
    // get the user from the request
    const user: UserEntity = req.user as UserEntity;
    // generate the access token
    const accessToken: string = await this.tokenService.generateAccessToken({
      userId: user.getId().getId(),
      email: user.getEmail().getEmail(),
      role: user.getRole().getRole(),
    });
    // redirect to the frontend
    const frontendUrl: string = this.configService.get<string>(
      "app.APP_FRONTEND_URL",
    )!;
    const postfix: string = this.configService.get<string>(
      "auth.GOOGLE_FRONTEND_CALLBACK_POSTFIX",
    )!;
    res.redirect(`${frontendUrl}/${postfix}?accessToken=${accessToken}`);
  }

  /**
   * Send a verify code to a user's email
   */
  @Post("verify-code/send")
  @Public()
  public async sendCode(
    @Body() sendCodeRequestDto: SendCodeRequestDto,
  ): Promise<SendCodeResponseDto> {
    const resetToken: string = await this.sendCodeUseCase.execute(
      new EmailValueObject(sendCodeRequestDto.email),
    );
    return { resetToken: resetToken };
  }

  /**
   * Verify a code
   */
  @Post("verify-code/verify")
  @Public()
  public async verifyCode(
    @Body() verifyCodeRequestDto: VerifyCodeRequestDto,
  ): Promise<VerifyCodeResponseDto> {
    const { isValid } = await this.verifyCodeUseCase.execute(
      verifyCodeRequestDto.code,
      verifyCodeRequestDto.resetToken,
    );
    return { isValid: isValid };
  }

  /**
   * Reset a user's password
   */
  @Post("reset-password")
  @Public()
  public async resetPassword(
    @Body() resetPasswordRequestDto: ResetPasswordRequestDto,
  ): Promise<void> {
    // verify the code
    const { isValid, payload } = await this.verifyCodeUseCase.execute(
      resetPasswordRequestDto.code,
      resetPasswordRequestDto.resetToken,
    );
    if (!isValid) {
      throw new UnauthorizedException("Invalid code");
    }

    // reset the password
    await this.resetPasswordUseCase.execute(
      payload!,
      resetPasswordRequestDto.password,
    );
  }
}
