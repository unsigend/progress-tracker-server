// import dependencies
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

// import value objects
import { PasswordValueObject } from "@/modules/user/domain/value-object/password.vo";

// import services
import { IPasswordHasher } from "@/modules/user/domain/services/password-hash.service";

/**
 * Bcrypt password hasher service
 * @description Bcrypt password hasher service
 */
@Injectable()
export class BcryptPasswordHasherService implements IPasswordHasher {
  constructor() {}

  /**
   * Hash a password and return a new password value object
   * @description Hash a password
   * @param password - The password to be hashed
   * @returns The hashed password value object
   */
  async hash(password: PasswordValueObject): Promise<PasswordValueObject> {
    return new PasswordValueObject(
      await bcrypt.hash(password.getPassword(), 10),
    );
  }

  /**
   * Verify a password and return true if the password is verified, false otherwise
   * @description Verify a password
   * @param password - The password to be verified
   * @param hashedPassword - The hashed password value object to be verified
   * @returns True if the password is verified, false otherwise
   */
  async verify(
    password: PasswordValueObject,
    hashedPassword: PasswordValueObject,
  ): Promise<boolean> {
    return await bcrypt.compare(
      password.getPassword(),
      hashedPassword.getPassword(),
    );
  }
}
