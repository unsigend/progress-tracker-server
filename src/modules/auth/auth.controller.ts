// import dependencies
import {
  Controller,
  Post,
  UseGuards,
  Req,
  UnauthorizedException,
  Body,
  BadRequestException,
  Get,
  Param,
  Res,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiParam,
} from "@nestjs/swagger";
import type { Request, Response } from "express";

// import services
import { AuthService } from "@modules/auth/auth.service";
import { UserService } from "@modules/user/user.service";
import { ConfigService } from "@nestjs/config";

// import dto
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { LoginRequestDto } from "@/modules/auth/dto/login-request.dto";
import { LoginResponseDto } from "@/modules/auth/dto/login-response.dto";
import { RegisterRequestDto } from "@/modules/auth/dto/register-request.dto";
import { UserCreateDto } from "@/modules/user/dto/user-create.dto";
import { EmailCheckResponseDto } from "@/modules/auth/dto/email-check-response.dto";
import { EmailCheckRequestDto } from "./dto/email-check-request.dto";

// import guards
import { LocalAuthGuard } from "@common/guards/local-auth.guard";
import { GoogleAuthGuard } from "@common/guards/google-auth.guard";
import { GithubAuthGuard } from "@common/guards/github-auth.guard";

// import decorators
import { Public } from "@common/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Login a user
   * @param req - The request object
   * @returns The user
   */
  @ApiOperation({ summary: "Login a user" })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: "User logged in successfully",
  })
  @ApiResponse({ status: 201, description: "User logged in successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiBody({ type: LoginRequestDto })
  @Post("login")
  @Public()
  @UseGuards(LocalAuthGuard)
  public login(@Req() req: Request): LoginResponseDto {
    const user: UserResponseDto = req.user as UserResponseDto;
    return this.authService.generateJWT(user);
  }

  /**
   * Logout a user
   * @returns boolean
   */
  @ApiOperation({ summary: "Logout a user" })
  @ApiOkResponse({ description: "User logged out successfully", type: Boolean })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("logout")
  @Public()
  public logout(@Req() req: Request): Promise<boolean> {
    if (typeof req.logOut === "function") {
      req.logOut((err) => {
        if (err) {
          throw new UnauthorizedException();
        }
      });
    }
    return Promise.resolve(true);
  }

  /**
   * Register a user
   * @param registerUserDto - The register user dto
   * @returns The login response dto
   */
  @ApiOperation({ summary: "Register a user" })
  @ApiBody({ type: RegisterRequestDto })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: "User registered successfully",
  })
  @ApiBadRequestResponse({ description: "Email already exists" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("register")
  @Public()
  public async register(
    @Body() registerUserDto: RegisterRequestDto,
  ): Promise<LoginResponseDto> {
    const userEmail = registerUserDto.email;

    // check if the email already exists
    const user: UserResponseDto | null = (await this.userService.findByEmail(
      userEmail,
      false,
    )) as UserResponseDto | null;
    if (user) {
      throw new BadRequestException("Email already exists");
    }

    // create the user
    const newUser: UserCreateDto = {
      ...registerUserDto,
    };

    // create the user
    const newUserResponse: UserResponseDto | null =
      (await this.userService.create(newUser, false)) as UserResponseDto | null;

    // generate the jwt token
    const jwtToken: LoginResponseDto = this.authService.generateJWT(
      newUserResponse as UserResponseDto,
    );

    return jwtToken;
  }

  /**
   * Check if an email exists
   * @param emailCheckParam - The email check param
   * @returns The email check response dto
   */
  @ApiOperation({ summary: "Check if an email exists" })
  @ApiParam({ name: "email", description: "The email to check" })
  @ApiOkResponse({
    type: EmailCheckResponseDto,
    description: "Whether the email exists",
  })
  @Get("email-check/:email")
  @Public()
  public async emailCheck(
    @Param() emailCheckParam: EmailCheckRequestDto,
  ): Promise<EmailCheckResponseDto> {
    const user: UserResponseDto | null = (await this.userService.findByEmail(
      emailCheckParam.email,
      false,
    )) as UserResponseDto | null;
    return { exists: !!user };
  }

  /**
   * Login with Google entry point
   * This method is the entry point for the Google OAuth flow
   * but no data is returned
   * @returns void
   */
  @ApiOperation({ summary: "Login with Google only the entry point" })
  @ApiOkResponse({ description: "User logged in with Google successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("google")
  @Public()
  @UseGuards(GoogleAuthGuard)
  public google(): void {}

  /**
   * Google OAuth callback
   * This method is the callback for the Google OAuth flow
   * redirect to the frontend with the access_token
   */
  @ApiOperation({
    summary:
      "Google OAuth callback redirect to the frontend with the access_token",
  })
  @ApiOkResponse({
    description: "User logged in with Google successfully",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("google/callback")
  @Public()
  @UseGuards(GoogleAuthGuard)
  public googleCallback(
    @Res({ passthrough: false }) res: Response,
    @Req() req: Request,
  ): void {
    // generate the access token
    const accessToken: LoginResponseDto = this.authService.generateJWT(
      req.user as UserResponseDto,
    );
    // format the redirect url
    let redirectUrl = `${this.configService.get<string>("auth.GOOGLE_FRONTEND_REDIRECT_URL")!}?`;
    redirectUrl += `access_token=${accessToken.access_token}`;
    // redirect to the frontend
    res.redirect(redirectUrl);
  }

  /**
   * Login with Github entry point
   * This method is the entry point for the Github OAuth flow
   * but no data is returned
   * @returns void
   */
  @ApiOperation({ summary: "Login with Github only the entry point" })
  @ApiOkResponse({ description: "User logged in with Github successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("github")
  @Public()
  @UseGuards(GithubAuthGuard)
  public github(): void {}

  /**
   * Github OAuth callback
   * This method is the callback for the Github OAuth flow
   * redirect to the frontend with the access_token
   */
  @ApiOperation({
    summary:
      "Github OAuth callback redirect to the frontend with the access_token",
  })
  @ApiOkResponse({
    description: "User logged in with Github successfully",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("github/callback")
  @Public()
  @UseGuards(GithubAuthGuard)
  public githubCallback(
    @Res({ passthrough: false }) res: Response,
    @Req() req: Request,
  ): void {
    // generate the access token
    const accessToken: LoginResponseDto = this.authService.generateJWT(
      req.user as UserResponseDto,
    );
    // redirect to the frontend
    let redirectUrl = `${this.configService.get<string>("auth.GITHUB_FRONTEND_REDIRECT_URL")!}?`;
    redirectUrl += `access_token=${accessToken.access_token}`;
    res.redirect(redirectUrl);
  }
}
