// import dependencies
import { ObjectIdValueObject } from "@shared/domain/value-object/object-id.vo";
import { EmailValueObject } from "../value-object/email.vo";
import { ProviderValueObject } from "../value-object/provider.vo";
import { PasswordValueObject } from "../value-object/password.vo";
import { RoleValueObject } from "../value-object/role.vo";
import { UrlValueObject } from "@shared/domain/value-object/url.vo";

/**
 * User role
 * @description User role
 */
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

/**
 * User entity
 * @description User entity which is used to store the user information.
 */
export class UserEntity {
  // private properties
  private readonly id: ObjectIdValueObject;
  private username: string;
  private email: EmailValueObject;
  private password: PasswordValueObject;
  private role: RoleValueObject;
  private provider: ProviderValueObject;
  private readonly createdAt: Date;
  private updatedAt: Date;

  // optional properties
  private avatarUrl: UrlValueObject | null;
  private deletedAt: Date | null;

  /**
   * Constructor for UserEntity
   * @param id - The id of the user
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param role - The role of the user
   * @param provider - The provider of the user
   * @param createdAt - The created at date of the user
   * @param updatedAt - The updated at date of the user
   * @param avatarUrl - The avatar url of the user
   * @param deletedAt - The deleted at date of the user
   */
  private constructor(
    username: string,
    email: EmailValueObject,
    password: PasswordValueObject,
    id?: ObjectIdValueObject | null,
    role?: RoleValueObject | null,
    provider?: ProviderValueObject | null,
    avatarUrl?: UrlValueObject | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
  ) {
    this.id = id ?? new ObjectIdValueObject();
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role ?? new RoleValueObject(UserRole.USER);
    this.provider = provider ?? new ProviderValueObject(["local"]);
    this.avatarUrl = avatarUrl ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.deletedAt = deletedAt ?? null;
  }

  /**
   * Create a new user
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param role - The role of the user
   * @param avatarUrl - The avatar url of the user
   * @returns The new user
   */
  public static create(
    username: string,
    email: EmailValueObject,
    password: PasswordValueObject,
    role?: RoleValueObject | null,
    avatarUrl?: UrlValueObject | null,
  ): UserEntity {
    return new UserEntity(
      username,
      email,
      password,
      null,
      role,
      null,
      avatarUrl,
    );
  }

  /**
   * Reconstitute a user
   * @param id - The id of the user
   * @param username - The username of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param role - The role of the user
   * @param provider - The provider of the user
   * @param avatarUrl - The avatar url of the user
   * @param createdAt - The created at date of the user
   * @param updatedAt - The updated at date of the user
   * @param deletedAt - The deleted at date of the user
   * @returns The user
   */
  public static reconstitute(
    id: ObjectIdValueObject,
    username: string,
    email: EmailValueObject,
    password: PasswordValueObject,
    role: RoleValueObject,
    provider: ProviderValueObject,
    avatarUrl: UrlValueObject | null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  ): UserEntity {
    return new UserEntity(
      username,
      email,
      password,
      id,
      role,
      provider,
      avatarUrl,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  /**
   * Get the id of the user
   * @returns The id of the user
   */
  public getId(): ObjectIdValueObject {
    return this.id;
  }

  /**
   * Get the username of the user
   * @returns The username of the user
   */
  public getUsername(): string {
    return this.username;
  }

  /**
   * Get the avatar url of the user
   * @returns The avatar url of the user
   */
  public getAvatarUrl(): UrlValueObject | null {
    return this.avatarUrl;
  }

  /**
   * Get the email of the user
   * @returns The email of the user
   */
  public getEmail(): EmailValueObject {
    return this.email;
  }

  /**
   * Get the password of the user
   * @returns The password of the user
   */
  public getPassword(): PasswordValueObject {
    return this.password;
  }

  /**
   * Get the provider of the user
   * @returns The provider of the user
   */
  public getProvider(): ProviderValueObject {
    return this.provider;
  }

  /**
   * Get the created at date of the user
   * @returns The created at date of the user
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get the updated at date of the user
   * @returns The updated at date of the user
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  /**
   * Get the avatar url of the user
   * @returns The avatar url of the user
   */
  public getRole(): RoleValueObject {
    return this.role;
  }

  /**
   * Set the username of the user
   * @param username - The username of the user
   */
  public setUsername(username: string): void {
    this.username = username;
    this.updatedAt = new Date();
  }

  /**
   * Set the email of the user
   * @param email - The email of the user
   */
  public setEmail(email: EmailValueObject): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  /**
   * Set the password of the user
   * @param password - The password of the user
   */
  public setPassword(password: PasswordValueObject): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  /**
   * Set the role of the user
   * @param role - The role of the user
   */
  public setRole(role: RoleValueObject): void {
    this.role = role;
    this.updatedAt = new Date();
  }

  /**
   * Set the provider of the user
   * @param provider - The provider of the user
   */
  public setProvider(provider: ProviderValueObject): void {
    this.provider = provider;
    this.updatedAt = new Date();
  }

  /**
   * Set the avatar url of the user
   * @param avatarUrl - The avatar url of the user
   */
  public setAvatarUrl(avatarUrl: UrlValueObject): void {
    this.avatarUrl = avatarUrl;
    this.updatedAt = new Date();
  }

  /**
   * Set the deleted at date of the user
   * @param deletedAt - The deleted at date of the user
   */
  public setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
    this.updatedAt = new Date();
  }
}
