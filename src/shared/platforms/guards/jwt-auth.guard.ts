// import dependencies
import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

// import decorators
import { IS_PUBLIC_KEY } from "@shared/platforms/decorators/public.decorator";

/**
 * JWT authentication guard
 * @description JWT authentication guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // if the request is public, skip the authentication
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
