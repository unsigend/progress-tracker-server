/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Res,
} from "@nestjs/common";
import type { Response as ExpressResponse } from "express";

// import services
import { AuthService } from "@/auth/auth.service";
import { AuthGithubService } from "@/auth/auth.github.service";
import { AuthGoogleService } from "@/auth/auth.google.service";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { EmailCheckDto } from "@/auth/dto/email-check.dto";
import { AuthResponseDto } from "@/auth/dto/auth-response.dto";
import { EmailCheckResponseDto } from "@/auth/dto/email-check-response.dto";
import { AuthRequestDto } from "@/auth/dto/auth-request.dto";

// import decorators
import { Public } from "@/decorators/public.decorator";

// import swagger decorators
import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiBody,
} from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGithubService: AuthGithubService,
    private readonly authGoogleService: AuthGoogleService,
  ) {}

  /**
   * Login a user
   *
   * @remarks This endpoint logs in a user and set cookie for the token
   * @returns whether the login is successful
   */
  @ApiResponse({
    status: 200,
    description: "Login successful",
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid email or password",
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res() response: ExpressResponse,
  ): Promise<AuthResponseDto> {
    return this.authService.login(loginDto, response);
  }

  /**
   * Logout a user
   *
   * @remarks This endpoint logs out a user and clear the cookie for the token
   * @returns whether the logout is successful
   */
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: "Logout successful",
    type: AuthResponseDto,
  })
  logout(@Res() response: ExpressResponse): AuthResponseDto {
    // clear the cookie for the token
    response.clearCookie("access_token");

    return { success: true };
  }

  /**
   * Register a user
   *
   * @remarks This endpoint registers a user and set cookie for the token
   * @returns whether the registration is successful
   */
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
    schema: {
      type: "object",
      properties: {
        message: { type: "array", items: { type: "string" } },
        error: { type: "string" },
        statusCode: { type: "number" },
      },
    },
  })
  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: CreateUserDto,
    @Res() response: ExpressResponse,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerDto, response);
  }

  /**
   * Authenticate a user with github
   *
   * @remarks This endpoint authenticates a user with github and set cookie for the token
   * @param authRequestDto The code from github
   * @returns whether the authentication is successful
   */
  @ApiResponse({
    status: 200,
    description: "Github authentication successful",
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Github authentication failed",
  })
  @Public()
  @Post("github")
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthRequestDto })
  async githubAuth(
    @Body() authRequestDto: AuthRequestDto,
    @Res() response: ExpressResponse,
  ): Promise<AuthResponseDto> {
    let githubUser: any;
    try {
      // exchange the code for a token
      const accessToken = await this.authGithubService.exchangeCodeForToken(
        authRequestDto.code,
      );
      // get the user from github
      githubUser = await this.authGithubService.getGithubUser(accessToken);
    } catch {
      throw new UnauthorizedException("Github authentication failed");
    }
    // create or link the user to the github account
    const user = await this.authGithubService.createOrLinkUser(githubUser);
    // create a token for the user
    const token = await this.authService.createToken(user);

    response.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { success: true };
  }

  /**
   * Authenticate a user with google
   *
   * @remarks This endpoint authenticates a user with google and set cookie for the token
   * @param authRequestDto The code from google
   * @returns whether the authentication is successful
   */
  @ApiResponse({
    status: 200,
    description: "Google authentication successful",
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Google authentication failed",
  })
  @Public()
  @Post("google")
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthRequestDto })
  async googleAuth(
    @Body() authRequestDto: AuthRequestDto,
    @Res() response: ExpressResponse,
  ): Promise<AuthResponseDto | null> {
    let googleUser: any;
    try {
      // exchange the code for a token
      const accessToken = await this.authGoogleService.exchangeCodeForToken(
        authRequestDto.code,
      );
      // get the user from google
      googleUser = await this.authGoogleService.getGoogleUser(accessToken);
    } catch (error) {
      throw new UnauthorizedException("Google authentication failed");
    }

    // create or link the user to the google account
    const user = await this.authGoogleService.createOrLinkUser(googleUser);
    // create a token for the user
    const token = await this.authService.createToken(user);

    response.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { success: true };
  }

  /**
   * Check if an email is already in use
   *
   * @remarks This endpoint checks if an email is already in use
   * @param emailCheckDto The email to check
   * @returns whether the email is already in use
   */
  @ApiResponse({
    status: 200,
    description: "Email check successful",
    type: EmailCheckResponseDto,
  })
  @Public()
  @Get("email-check")
  async emailCheck(
    @Query() emailCheckDto: EmailCheckDto,
  ): Promise<EmailCheckResponseDto> {
    const isEmailInUse = await this.authService.emailCheck(emailCheckDto.email);
    return { exists: isEmailInUse };
  }
}
