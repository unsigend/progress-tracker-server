// import dependencies
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Google auth guard
 * @description Google auth guard
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {}
