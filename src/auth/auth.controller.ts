// import dependencies
import { Controller, Post, Body, Query, Get } from "@nestjs/common";

// import services
import { AuthService } from "@/auth/auth.service";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { RegisterDto } from "@/auth/dto/register.dto";
import { ResponseUserDto } from "@/auth/dto/response-user.dto";
import { EmailCheckDto } from "@/auth/dto/email-check.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login a user
   *
   * @remarks This endpoint logs in a user
   */
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  /**
   * Register a user
   *
   * @remarks This endpoint registers a user
   */
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
   */
  @Get("email-check")
  async emailCheck(@Query() emailCheckDto: EmailCheckDto): Promise<boolean> {
    const isEmailInUse = await this.authService.emailCheck(emailCheckDto.email);
    return isEmailInUse;
  }
}
