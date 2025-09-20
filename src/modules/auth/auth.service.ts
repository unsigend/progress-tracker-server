// import dependencies
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

// import services
import { UserService } from "@modules/user/user.service";

// import dto
import { UserResponseDto } from "@modules/user/dto/user-response.dto";
import { UserLoginDto } from "@modules/auth/dto/user-login.dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Validate a user
   * @param userLoginDto - The user login dto
   * @returns The user or null if the user is not found
   * @public
   */
  public async validateUser(
    userLoginDto: UserLoginDto,
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
}
