// import dependencies
import { ObjectIdValueObject } from "@domain/value-objects/common/object-id.vo";
import { ProviderValueObject } from "@domain/value-objects/user/provider.vo";
import { UsernameValueObject } from "@domain/value-objects/user/username.vo";
import { RoleValueObject } from "@domain/value-objects/user/role.vo";
import { UrlValueObject } from "@domain/value-objects/common/url.vo";
import { EmailValueObject } from "@domain/value-objects/user/email.vo";
import { PasswordValueObject } from "@domain/value-objects/user/password.vo";

/**
 * User role enum
 * @description User role enum
 */
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

/**
 * User entity
 * @description User entity
 */
export class UserEntity {
  // required fields
  private readonly id: ObjectIdValueObject;
  private username: UsernameValueObject;
  private email: EmailValueObject;
  private password: PasswordValueObject;
  private provider: ProviderValueObject | null;
  private role: RoleValueObject | null;
  private readonly createdAt: Date | null;
  private updatedAt: Date | null;

  // optional fields
  private avatarUrl: UrlValueObject | null;
  private deletedAt: Date | null;

  /**
   * Private constructor used by the factory methods
   */
  private constructor(
    id: ObjectIdValueObject,
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
    provider?: ProviderValueObject | null,
    role?: RoleValueObject | null,
    avatarUrl?: UrlValueObject | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.provider = provider ?? null;
    this.role = role ?? null;
    this.createdAt = createdAt ?? null;
    this.updatedAt = updatedAt ?? null;
    this.deletedAt = deletedAt ?? null;
    this.avatarUrl = avatarUrl ?? null;
  }

  /**
   * Factory method to create a new user entity
   * @description Create a new user entity
   */
  public static create(
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
    provider?: ProviderValueObject,
    role?: RoleValueObject,
    avatarUrl?: UrlValueObject | null,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ): UserEntity {
    return new UserEntity(
      new ObjectIdValueObject(),
      username,
      email,
      password,
      provider ?? new ProviderValueObject(["local"]),
      role ?? new RoleValueObject(UserRole.USER),
      avatarUrl ?? null,
      createdAt ?? new Date(),
      updatedAt ?? new Date(),
      deletedAt ?? null,
    );
  }

  /**
   * Factory method to reconstitute a user entity
   * @description Reconstitute a user entity
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    username: UsernameValueObject,
    email: EmailValueObject,
    password: PasswordValueObject,
    provider?: ProviderValueObject,
    role?: RoleValueObject,
    avatarUrl?: UrlValueObject | null,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
  ): UserEntity {
    return new UserEntity(
      id,
      username,
      email,
      password,
      provider ?? new ProviderValueObject(["local"]),
      role ?? new RoleValueObject(UserRole.USER),
      avatarUrl ?? null,
      createdAt ?? new Date(),
      updatedAt ?? new Date(),
      deletedAt ?? null,
    );
  }

  /**
   * Get the id of the user
   * @returns The id of the user
   */
  getId(): ObjectIdValueObject | null {
    return this.id;
  }

  /**
   * Get the username of the user
   * @returns The username of the user
   */
  getUsername(): UsernameValueObject | null {
    return this.username;
  }

  /**
   * Get the email of the user
   * @returns The email of the user
   */
  getEmail(): EmailValueObject | null {
    return this.email;
  }

  /**
   * Get the password of the user
   * @returns The password of the user
   */
  getPassword(): PasswordValueObject | null {
    return this.password;
  }

  /**
   * Get the provider of the user
   * @returns The provider of the user
   */
  getProvider(): ProviderValueObject | null {
    return this.provider;
  }

  /**
   * Get the role of the user
   * @returns The role of the user
   */
  getRole(): RoleValueObject | null {
    return this.role;
  }

  /**
   * Get the created at date of the user
   * @returns The created at date of the user
   */
  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  /**
   * Get the updated at date of the user
   * @returns The updated at date of the user
   */
  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  /**
   * Get the deleted at date of the user
   * @returns The deleted at date of the user
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
   * Set the username of the user
   * @param username - The username to be set
   */
  setUsername(username: UsernameValueObject): void {
    this.username = username;
    this.updatedAt = new Date();
  }

  /**
   * Set the email of the user
   * @param email - The email to be set
   */
  setEmail(email: EmailValueObject): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  /**
   * Set the password of the user
   * @param password - The password to be set
   */
  setPassword(password: PasswordValueObject): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  /**
   * Set the provider of the user
   * @param provider - The provider to be set
   */
  setProvider(provider: ProviderValueObject): void {
    this.provider = provider;
    this.updatedAt = new Date();
  }

  /**
   * Set the role of the user
   * @param role - The role to be set
   */
  setRole(role: RoleValueObject): void {
    this.role = role;
    this.updatedAt = new Date();
  }

  /**
   * Set the avatar url of the user
   * @param avatarUrl - The avatar url to be set
   */
  setAvatarUrl(avatarUrl: UrlValueObject): void {
    this.avatarUrl = avatarUrl;
    this.updatedAt = new Date();
  }

  /**
   * Set the deleted at date of the user
   * @param deletedAt - The deleted at date to be set
   */
  setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
    this.updatedAt = new Date();
  }

  /**
   * Delete the user
   */
  delete(): void {
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
