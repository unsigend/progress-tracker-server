// import dependencies
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

// import services
import { UserService } from "@modules/user/user.service";
import { JwtService } from "@nestjs/jwt";

// import dto
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { LoginRequestDto } from "@/modules/auth/dto/login-request.dto";
import { LoginResponseDto } from "@/modules/auth/dto/login-response.dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate a user
   * @param userLoginDto - The user login dto
   * @returns The user or null if the user is not found
   * @public
   */
  public async validateUser(
    userLoginDto: LoginRequestDto,
  ): Promise<UserResponseDto | null> {
    const user: User | null = (await this.userService.findByEmail(
      userLoginDto.email,
      true,
    )) as User | null;
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );
    if (!isPasswordValid) return null;

    const safeUser: UserResponseDto = this.userService.filterUser(user);

    return safeUser;
  }

  /**
   * Generate a JWT token for a user
   * @param user - The user to generate a JWT token for
   * @returns The JWT token
   */
  generateJWT(user: UserResponseDto): LoginResponseDto {
    // create the payload
    const playload = { sub: user.id, email: user.email };
    // create the login response
    const LoginResponse: LoginResponseDto = {
      access_token: this.jwtService.sign(playload),
    };
    return LoginResponse;
  }
}
