/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

// import DTO
import { CreateUserDto } from "@/user/dto/create-user.dto";

import { Logger } from "@nestjs/common";

@Injectable()
export class AuthGithubService {
  private readonly logger: Logger;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(AuthGithubService.name);
  }

  /**
   * Exchange a code for a token used for authentication in github
   *
   * @remarks This method exchanges a code for a token
   * @param code The code to exchange used for authentication in github
   * @returns The access token return by github
   * @throws An error if the code cannot be exchanged for a token in github
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const clientID: string | undefined =
      this.configService.get("GITHUB_CLIENT_ID");
    const clientSecret: string | undefined = this.configService.get(
      "GITHUB_CLIENT_SECRET",
    );
    if (!clientID || !clientSecret) {
      this.logger.error(
        "GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is required in environment variables",
      );
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

    if (!response.ok) {
      this.logger.error("Failed to exchange code for token in github");
      throw new Error("Failed to exchange code for token in github");
    }

    const data: any = await response.json();
    return data.access_token;
  }

  /**
   * Get a user from github
   *
   * @remarks This method gets a user from github
   * @param accessToken The access token to get a user from github
   * @returns The user from github
   * @throws An error if the user data cannot be retrieved from github
   */
  async getGithubUser(accessToken: string): Promise<any> {
    const url = "https://api.github.com/user";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      this.logger.error(`Failed to get user data from github: ${url}`);
      throw new Error(`Failed to get user data from github: ${url}`);
    }

    const data: any = await response.json();

    // second request to get the user's email
    if (!data.email) {
      const emailResponse = await fetch(`${url}/emails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const emailData: any = await emailResponse.json();
      const primaryEmail = emailData.find((email: any) => email.primary);
      data.email = primaryEmail?.email || emailData[0]?.email;
    }

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
    const user: User | null = await this.userService.findByEmail(
      githubUser.email,
    );

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
      const createUserDto: CreateUserDto = {
        password: randomPassword,
        email: githubUser.email,
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
