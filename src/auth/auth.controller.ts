// import dependencies
import { Controller, Post, Body } from "@nestjs/common";

// import services
import { AuthService } from "@/auth/auth.service";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { RegisterDto } from "@/auth/dto/register.dto";
import { ResponseUserDto } from "@/auth/dto/response-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login a user
   *
   * @remarks This endpoint logs in a user
   */
  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<ResponseUserDto | null> {
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
}
