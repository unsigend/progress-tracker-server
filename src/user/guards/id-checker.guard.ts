// import dependencies
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

/**
 * ID checker guard
 *
 * used to check if the user is the same as the user in the request
 */
@Injectable()
export class IDCheckerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request & { user: { sub: string } } = context
      .switchToHttp()
      .getRequest();
    const CurrentUserId = request.user.sub || "";
    const UserId = request.params.id;
    return CurrentUserId === UserId;
  }
}
