/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import dependencies
import { Injectable } from "@nestjs/common";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { RegisterDto } from "@/auth/dto/register.dto";
import { ResponseUserDto } from "@/auth/dto/response-user.dto";

// import models
import { User } from "@prisma/client";

// import exceptions
import { UnauthorizedException } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";
import { PrismaService } from "@/prisma/prisma.service";

// import bcrypt
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  /**
   * Login a user
   *
   * @remarks This method logs in a user
   */
  async login(loginDto: LoginDto): Promise<ResponseUserDto | null> {
    const user: User | null = await this.userService.findByEmail(
      loginDto.email,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const plainPassword = loginDto.password;
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const safeUser: ResponseUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return safeUser;
  }

  /**
   * Register a user
   *
   * @remarks This method registers a user
   */
  async register(registerDto: RegisterDto): Promise<ResponseUserDto | null> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user: User | null = await this.prismaService.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    const safeUser: ResponseUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return safeUser;
  }
}
