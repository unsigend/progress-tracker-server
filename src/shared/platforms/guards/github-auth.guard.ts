// import dependencies
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Github auth guard
 * @description Github auth guard
 */
@Injectable()
export class GithubAuthGuard extends AuthGuard("github") {}
