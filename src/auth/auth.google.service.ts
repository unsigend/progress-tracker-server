/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import dependencies
import { Injectable, Logger } from "@nestjs/common";

// import services
import { ConfigService } from "@nestjs/config";
import { UserService } from "@/user/user.service";

// import models
import { User } from "@prisma/client";

@Injectable()
export class AuthGoogleService {
  private readonly logger: Logger;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(AuthGoogleService.name);
  }

  /**
   * Exchange a code for a token used for authentication in google
   *
   * @remarks This method exchanges a code for a token
   * @param code The code to exchange used for authentication in google
   * @returns The access token return by google
   * @throws Error if the code is invalid or the client ID,
   * client secret, or redirect URI is not set
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const clientID: string | undefined =
      this.configService.get("GOOGLE_CLIENT_ID");
    const clientSecret: string | undefined = this.configService.get(
      "GOOGLE_CLIENT_SECRET",
    );
    const redirectURI: string | undefined = this.configService.get(
      "GOOGLE_REDIRECT_URI",
    );

    if (!clientID) {
      this.logger.error(
        "GOOGLE_CLIENT_ID is required in environment variables",
      );
      throw new Error("GOOGLE_CLIENT_ID is required in environment variables");
    }
    if (!clientSecret) {
      this.logger.error(
        "GOOGLE_CLIENT_SECRET is required in environment variables",
      );
      throw new Error(
        "GOOGLE_CLIENT_SECRET is required in environment variables",
      );
    }
    if (!redirectURI) {
      this.logger.error(
        "GOOGLE_REDIRECT_URI is required in environment variables",
      );
      throw new Error(
        "GOOGLE_REDIRECT_URI is required in environment variables",
      );
    }
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: redirectURI,
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      this.logger.error(
        `Failed to exchange code for token in google: \
        ${response.status} ${response.statusText}`,
        errorData,
      );
      throw new Error(
        `Failed to exchange code for token in google: \
        ${response.status} ${response.statusText}`,
      );
    }

    const data: any = await response.json();
    return data.access_token;
  }

  /**
   * Get a user from Google using an access token
   *
   * @remarks This method gets a user from Google using an access token
   * @param accessToken The access token to use for authentication
   * @returns The user data from Google
   * @throws Error if the user data cannot be retrieved from Google
   */
  async getGoogleUser(accessToken: string): Promise<any> {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      this.logger.error(
        `Failed to get user from Google: ${response.status} ${response.statusText}`,
        errorData,
      );
      throw new Error(
        `Failed to get user from Google: ${response.status} ${response.statusText}`,
      );
    }

    const googleUser: any = await response.json();
    return googleUser;
  }

  /**
   * Create or link a user to the google account
   *
   * @remarks This method creates or links a user to the google account
   * @param googleUser The user from google
   * @returns The user
   */
  async createOrLinkUser(googleUser: any): Promise<User> {
    const user: User | null = await this.userService.findByEmail(
      googleUser.email,
    );

    if (user) {
      // if user exists but not linked to google, link it
      if (!user.provider.includes("google")) {
        await this.userService.update(user.id, {
          provider: [...user.provider, "google"],
        });
      }
      return user;
    } else {
      // create a random password for consistency
      const randomPassword: string = Math.random()
        .toString(36)
        .substring(2, 15);

      // if user does not exist, create a new user
      const newUser: User = await this.userService.create({
        email: googleUser.email,
        password: randomPassword,
        name: googleUser.name,
        provider: ["google"],
        avatarURL: googleUser.picture || "",
      });
      return newUser;
    }
  }
}
