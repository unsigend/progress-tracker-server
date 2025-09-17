/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import dependencies
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// import types
import { Request, Response } from "express";

// import exceptions
import { UnauthorizedException } from "@nestjs/common";

// import services
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// import decorators
import { IS_PUBLIC_KEY } from "@/decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if the route is public
    // if it is, return true
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    // extract the token from the cookie
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // verify the token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("JWT_SECRET"),
      });
      // set the user in the request
      (request as any).user = payload;

      // extend the session
      this.extendSession(response, token, 7 * 24 * 60 * 60 * 1000);

      return true;
    } catch {
      // clear the cookie
      response.clearCookie("access_token");

      // throw an unauthorized exception
      throw new UnauthorizedException();
    }
  }

  /**
   * Extract the token from the cookie
   *
   * @param request The request object
   * @returns The token
   */
  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.["access_token"] as string | undefined;
  }

  /**
   * Extend the session by setting a new cookie for the token
   *
   * @param response The response object
   * @param token The token to set
   * @param maxAge The max age of the cookie
   *
   * @returns void
   */
  private extendSession(
    response: Response,
    token: string,
    maxAge: number,
  ): void {
    response.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge,
    });
  }
}
