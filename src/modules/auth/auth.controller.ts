// import dependencies
import {
  Controller,
  Post,
  UseGuards,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

// import services
import { AuthService } from "@modules/auth/auth.service";

// import dto
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { UserLoginDto } from "@modules/auth/dto/user-login.dto";

// import guards
import { LocalAuthGuard } from "@common/guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login a user
   * @param req - The request object
   * @returns The user
   */
  @ApiOperation({ summary: "Login a user" })
  @ApiResponse({ status: 201, description: "User logged in successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiBody({ type: UserLoginDto })
  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request): UserResponseDto {
    return req.user as UserResponseDto;
  }

  /**
   * Logout a user
   * @returns void
   */
  @ApiOperation({ summary: "Logout a user" })
  @ApiOkResponse({ description: "User logged out successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("logout")
  @UseGuards(AuthGuard("local"))
  logout(@Req() req: Request): void {
    req.logOut((err) => {
      if (err) {
        throw new UnauthorizedException();
      }
    });
  }
}
