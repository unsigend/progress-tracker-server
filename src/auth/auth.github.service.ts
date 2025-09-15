/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import dependencies
import { Injectable } from "@nestjs/common";

// import services
import { ConfigService } from "@nestjs/config";

// import models
import { User } from "@prisma/client";

// import services
import { UserService } from "@/user/user.service";

// import bcrypt
import { RegisterDto } from "@/auth/dto/register.dto";

@Injectable()
export class AuthGithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  /**
   * Exchange a code for a token used for authentication in github
   *
   * @remarks This method exchanges a code for a token
   * @param code The code to exchange for a token
   * @returns The access token
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const clientID: string | undefined =
      this.configService.get("GITHUB_CLIENT_ID");
    const clientSecret: string | undefined = this.configService.get(
      "GITHUB_CLIENT_SECRET",
    );
    if (!clientID || !clientSecret) {
      throw new Error(
        "GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is required in environment variables",
      );
    }
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams({
          code,
          client_id: clientID,
          client_secret: clientSecret,
        }),
      },
    );
    const data: any = await response.json();
    return data.access_token;
  }

  /**
   * Get a user from github
   *
   * @remarks This method gets a user from github
   * @param accessToken The access token to get a user from github
   * @returns The user from github
   */
  async getGithubUser(accessToken: string): Promise<any> {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = await response.json();
    return data;
  }

  /**
   * Create or link a user to the github account
   *
   * @remarks This method creates or links a user to the github account
   * @param githubUser The user from github
   * @returns The user
   */
  async createOrLinkUser(githubUser: any): Promise<User> {
    const userEmail: string = githubUser.email;

    // Check if email exists (GitHub might not provide email)
    if (!userEmail) {
      throw new Error("GitHub user email is required but not provided");
    }

    const user: User | null = await this.userService.findByEmail(userEmail);

    // check if user exists
    if (user) {
      // if user exists, link the user to the github account
      if (!user.provider.includes("github")) {
        await this.userService.update(user.id, {
          provider: [...user.provider, "github"],
        });
      }
      return user;
    } else {
      // if user does not exist, create a new user

      // create a random password for consistency
      const randomPassword: string = Math.random()
        .toString(36)
        .substring(2, 15);

      // construct the create user dto
      const createUserDto: RegisterDto = {
        password: randomPassword,
        email: userEmail,
        name: githubUser.name || githubUser.login,
        provider: ["github"],
        avatarURL: githubUser.avatar_url || "",
      };

      // create a new user
      const newUser = await this.userService.create(createUserDto);
      return newUser;
    }
  }
}
