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
import type { Request } from "express";
import * as bcrypt from "bcrypt";

// import services
import { AuthService } from "@modules/auth/auth.service";
import { UserService } from "@modules/user/user.service";

// import dto
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { LoginRequestDto } from "@/modules/auth/dto/login-request.dto";
import { LoginResponseDto } from "@/modules/auth/dto/login-response.dto";
import { RegisterUserDto } from "@/modules/auth/dto/register-user.dto";
import { CreateUserDto } from "@modules/user/dto/create-user.dto";
import { EmailCheckResponseDto } from "@/modules/auth/dto/email-check-response.dto";

// import guards
import { LocalAuthGuard } from "@common/guards/local-auth.guard";

// import decorators
import { Public } from "@common/decorators/public.decorator";
import { EmailCheckRequestDto } from "./dto/email-check-request.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Login a user
   * @param req - The request object
   * @returns The user
   */
  @ApiOperation({ summary: "Login a user" })
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
   * @returns void
   */
  @ApiOperation({ summary: "Logout a user" })
  @ApiOkResponse({ description: "User logged out successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("logout")
  @Public()
  @UseGuards(LocalAuthGuard)
  public logout(@Req() req: Request): void {
    req.logOut((err) => {
      if (err) {
        throw new UnauthorizedException();
      }
    });
  }

  /**
   * Register a user
   * @param registerUserDto - The register user dto
   * @returns The login response dto
   */
  @ApiOperation({ summary: "Register a user" })
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: "User registered successfully",
  })
  @ApiBadRequestResponse({ description: "Email already exists" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("register")
  @Public()
  public async register(
    @Body() registerUserDto: RegisterUserDto,
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
    const newUser: CreateUserDto = {
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
}
