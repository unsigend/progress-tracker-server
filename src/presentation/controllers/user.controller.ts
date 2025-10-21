// import dependencies
import { Controller } from "@nestjs/common";

// import use cases
import { RegisterUserUseCase } from "@/application/use-cases/user/register-user.use-case";

/**
 * User controller
 * @description User controller
 */
@Controller("user")
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}
}
