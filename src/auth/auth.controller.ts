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
   * @public
   * @returns The access token if the login is successful, null otherwise
   */
  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  /**
   * Register a user
   *
   * @remarks This endpoint registers a user
   * @public
   * @returns The user if the registration is successful, null otherwise
   */
  @Public()
  @Post("register")
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ResponseUserDto | null> {
    return this.authService.register(registerDto);
  }

  /**
   * Check if an email is already in use
   *
   * @remarks This endpoint checks if an email is already in use
   * @public
   */
  @Public()
  @Get("email-check")
  async emailCheck(@Query() emailCheckDto: EmailCheckDto): Promise<boolean> {
    const isEmailInUse = await this.authService.emailCheck(emailCheckDto.email);
    return isEmailInUse;
  }

  /**
   * Get the current user data
   *
   * @remarks This endpoint returns the current user data
   * @private
   */
  @Get("me")
  async me(@Request() request: any): Promise<ResponseUserDto | null> {
    const userID: string = request.user.sub;
    if (!userID) {
      throw new UnauthorizedException("User not found");
    }
    console.log(userID);
    const user: User | null = await this.userService.findById(userID);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
