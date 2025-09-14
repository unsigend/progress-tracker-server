/* eslint-disable @typescript-eslint/no-unused-vars */

// import dependencies
import { Injectable } from "@nestjs/common";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { RegisterDto } from "@/auth/dto/register.dto";

// import models
import { User } from "@prisma/client";

// import exceptions
import { UnauthorizedException } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";
import { PrismaService } from "@/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

// import bcrypt
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login a user
   *
   * @remarks This method logs in a user
   * @returns The access token if the login is successful, null otherwise
   */
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user: User | null = await this.userService.findByEmail(
      loginDto.email,
    );
    // check if user exists
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // check if password is correct
    const plainPassword = loginDto.password;
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // create JWT token
    const playload = { sub: user.id, username: user.name };
    const token = await this.jwtService.signAsync(playload);
    const tokenizedUser = {
      access_token: token,
    };

    return tokenizedUser;
  }

  /**
   * Register a user
   *
   * @remarks This method registers a user
   * @returns The user if the registration is successful, null otherwise
   */
  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user: User | null = await this.prismaService.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    // create JWT token
    const playload = { sub: user.id, username: user.name };
    const token = await this.jwtService.signAsync(playload);
    const tokenizedUser = {
      access_token: token,
    };
    return tokenizedUser;
  }

  /**
   * Check if an email is already in use
   *
   * @remarks This method checks if an email is already in use
   * @returns True if the email is already in use, false otherwise
   */
  async emailCheck(email: string): Promise<boolean> {
    const user: User | null = await this.userService.findByEmail(email);
    return user !== null;
  }
}
