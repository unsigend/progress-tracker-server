// user entity

// import value objects
import { ObjectIdValueObject } from "@domain/value-objects/general/object-id.vo";
import { EmailValueObject } from "@domain/value-objects/users/email.vo";
import { PasswordValueObject } from "@domain/value-objects/users/password.vo";
import { RoleValueObject } from "@domain/value-objects/users/role.vo";
import { UrlValueObject } from "@domain/value-objects/general/url.vo";
import { ProviderValueObject } from "@domain/value-objects/users/provider.vo";
import { UsernameValueObject } from "@domain/value-objects/users/username.vo";

// user role enum
export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

// user entity class
export class UserEntity {
  // required fields
  private readonly id: ObjectIdValueObject;
  private username: UsernameValueObject;
  private email: EmailValueObject;
  private password: PasswordValueObject;
  private provider: ProviderValueObject;
  private role: RoleValueObject;
  private createdAt: Date;
  private updatedAt: Date;

  // optional fields
  private avatarUrl: UrlValueObject | null;
  private deletedAt: Date | null;

  constructor(
    id: ObjectIdValueObject,
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
    provider: ProviderValueObject,
    role: RoleValueObject,
    createdAt: Date,
    updatedAt: Date,
    avatar_url?: UrlValueObject,
    deletedAt?: Date,
  ) {
    // set the required fields
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.provider = provider;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    // set the optional fields
    this.avatarUrl = avatar_url ?? null;
    this.deletedAt = deletedAt ?? null;
  }

  /**
   * Get the id of the user
   * @returns The id of the user
   */
  getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the username of the user
   * @returns The username of the user
   */
  getUsername(): UsernameValueObject {
    return this.username;
  }

  /**
   * Get the email of the user
   * @returns The email of the user
   */
  getEmail(): EmailValueObject {
    return this.email;
  }

  /**
   * Get the provider of the user
   * @returns The provider of the user
   */
  getProvider(): ProviderValueObject {
    return this.provider;
  }

  /**
   * Get the role of the user
   * @returns The role of the user
   */
  getRole(): RoleValueObject {
    return this.role;
  }

  /**
   * Get the created at of the user
   * @returns The created at of the user
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at of the user
   * @returns The updated at of the user
   */
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Get the deleted at of the user
   * @returns The deleted at of the user
   */
  getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  /**
   * Get the avatar url of the user
   * @returns The avatar url of the user
   */
  getAvatarUrl(): UrlValueObject | null {
    return this.avatarUrl;
  }

  /**
   * Get the password of the user
   * @returns The password of the user
   */
  getPassword(): PasswordValueObject {
    return this.password;
  }

  /**
   * Set the password of the user
   * @param password - The password to set
   */
  setPassword(password: PasswordValueObject): void {
    this.password = password;
    this.updatedAt = new Date();
  }
  /**
   * Set the username of the user
   * @param username - The username to set
   */
  setUsername(username: UsernameValueObject): void {
    this.username = username;
    this.updatedAt = new Date();
  }

  /**
   * Set the email of the user
   * @param email - The email to set
   */
  setEmail(email: EmailValueObject): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  /**
   * Set the provider of the user
   * @param provider - The provider to set
   */
  setProvider(provider: ProviderValueObject): void {
    this.provider = provider;
    this.updatedAt = new Date();
  }

  /**
   * Set the role of the user
   * @param role - The role to set
   */
  setRole(role: RoleValueObject): void {
    this.role = role;
    this.updatedAt = new Date();
  }

  /**
   * Set the avatar url of the user
   * @param avatar_url - The avatar url to set
   */
  setAvatarUrl(avatar_url: UrlValueObject): void {
    this.avatarUrl = avatar_url;
    this.updatedAt = new Date();
  }

  /**
   * Set the deleted at of the user
   * @param deletedAt - The deleted at to set
   */
  setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
    this.updatedAt = new Date();
  }
}
