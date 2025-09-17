// import dependencies
import { Injectable } from "@nestjs/common";
import { Response } from "express";

// import DTO
import { LoginDto } from "@/auth/dto/login.dto";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { AuthResponseDto } from "@/auth/dto/auth-response.dto";

// import models
import { User } from "@prisma/client";

// import exceptions
import { UnauthorizedException } from "@nestjs/common";

// import services
import { UserService } from "@/user/user.service";
import { JwtService } from "@nestjs/jwt";

// import bcrypt
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a token for a user
   *
   * @remarks This method creates a token for a user
   * @param user The user to create a token for
   * @returns The token
   */
  async createToken(user: User): Promise<string> {
    const playload = { sub: user.id, username: user.name };
    const token = await this.jwtService.signAsync(playload);
    return token;
  }

  /**
   * Login a user
   *
   * @remarks This method logs in a user, and set cookie for the token
   * @returns whether the login is successful
   */
  async login(
    loginDto: LoginDto,
    response: Response,
  ): Promise<AuthResponseDto> {
    // find the user by email
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
    const tokenizedUser = await this.createToken(user);
    response.cookie("access_token", tokenizedUser, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { success: true };
  }

  /**
   * Register a user
   *
   * @remarks This method registers a user
   * @returns The user if the registration is successful, null otherwise
   */
  async register(
    registerDto: CreateUserDto,
    response: Response,
  ): Promise<AuthResponseDto> {
    const user: User = await this.userService.create(registerDto);

    // create JWT token
    const tokenizedUser = await this.createToken(user);
    response.cookie("access_token", tokenizedUser, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { success: true };
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
