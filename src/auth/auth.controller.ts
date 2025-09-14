/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Request,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";

// import services
import { AuthService } from "@/auth/auth.service";
import { UserService } from "@/user/user.service";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { RegisterDto } from "@/auth/dto/register.dto";
import { ResponseUserDto } from "@/auth/dto/response-user.dto";
import { EmailCheckDto } from "@/auth/dto/email-check.dto";

// import decorators
import { Public } from "@/decorators/public.decorator";
import { User } from "@prisma/client";

// import swagger decorators
import {
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Login a user
   *
   * @remarks This endpoint logs in a user
   * @returns The access token if the login is successful, null otherwise
   */
  @ApiOkResponse({
    description: "Login successful",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Invalid email or password",
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  /**
   * Register a user
   *
   * @remarks This endpoint registers a user
   * @returns The user if the registration is successful, null otherwise
   */
  @ApiCreatedResponse({
    description: "User registered successfully",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
      },
    },
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
    @Body() registerDto: RegisterDto,
  ): Promise<{ access_token: string }> {
    return this.authService.register(registerDto);
  }

  /**
   * Check if an email is already in use
   *
   * @remarks This endpoint checks if an email is already in use
   * @returns True if the email is already in use, false otherwise
   */
  @ApiOkResponse({
    description: "Email check successful",
    schema: {
      type: "object",
      properties: {
        exists: { type: "boolean" },
      },
    },
  })
  @Public()
  @Get("email-check")
  async emailCheck(
    @Query() emailCheckDto: EmailCheckDto,
  ): Promise<{ exists: boolean }> {
    const isEmailInUse = await this.authService.emailCheck(emailCheckDto.email);
    return { exists: isEmailInUse };
  }

  /**
   * Get the current user data
   *
   * @remarks This endpoint returns the current user data
   */
  @ApiOkResponse({
    description: "User data retrieved successfully",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "User not found",
  })
  @Get("me")
  async me(@Request() request: any): Promise<ResponseUserDto | null> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not found");
    }
    const user: User | null = await this.userService.findById(userID);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
