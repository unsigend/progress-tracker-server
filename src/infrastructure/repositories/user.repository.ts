// User Repository Infrastructure Implementation

// import dependencies
import { Injectable } from "@nestjs/common";
import {
  Prisma,
  User as PrismaUser,
  UserRole as PrismaUserRole,
} from "@prisma/client";

// import interfaces
import {
  UserQueryInterface,
  UserRepositoryInterface,
} from "@/domain/repositories/user.repository.interface";

// import entities
import { User, UserRole } from "@/domain/entities/user.entity";

// import services
import { PrismaService } from "@/modules/database/prisma.service";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Map the user role to the prisma user role
   * @param role - The user role
   * @returns The prisma user role
   */
  private mapToPrismaRole(role: UserRole): PrismaUserRole {
    if (role === UserRole.ADMIN) {
      return PrismaUserRole.ADMIN;
    } else {
      return PrismaUserRole.USER;
    }
  }

  /**
   * Map the prisma user role to the user role
   * @param role - The prisma user role
   * @returns The user role
   */
  private mapToDomainRole(role: PrismaUserRole): UserRole {
    if (role === PrismaUserRole.ADMIN) {
      return UserRole.ADMIN;
    } else {
      return UserRole.USER;
    }
  }

  /**
   * Create a user
   * @param user - The user to create
   * @returns The created user
   */
  public async create(user: User): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, deletedAt, role, ...userData } = user;
    const prismaUser: PrismaUser = {
      ...userData,
      role: this.mapToPrismaRole(role),
    } as PrismaUser;
    const createdUser: PrismaUser = await this.prisma.user.create({
      data: prismaUser,
    });
    // map the prisma user to the user
    return {
      ...createdUser,
      role: this.mapToDomainRole(createdUser.role),
    } as User;
  }

  /**
   * Find all users
   * @param query - The query
   * @returns The users and the total number of users
   */
  public async findAll(
    query?: UserQueryInterface,
  ): Promise<{ users: User[]; totalCount: number }> {
    // build the where clause
    const whereClause: Prisma.UserWhereInput = {};
    if (query?.key && query.value) {
      whereClause[query.key] = query.value;
    }

    // build the order by clause
    const orderByClause: Prisma.UserOrderByWithRelationInput = {};
    if (query?.order && query?.sort) {
      orderByClause[query.sort] = query.order;
    }

    // build the skip and take clauses
    const take: number = query?.limit ?? 10;
    const skip: number = ((query?.page ?? 1) - 1) * take;

    // get the users
    const prismaUsers: PrismaUser[] = await this.prisma.user.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip,
      take,
    });

    // get the total count
    const totalCount: number = await this.prisma.user.count({
      where: whereClause,
    });

    return {
      users: prismaUsers.map((prismaUser) => ({
        ...prismaUser,
        role: this.mapToDomainRole(prismaUser.role),
      })) as User[],
      totalCount,
    };
  }

  /**
   * Find a user by id
   * @param id - The id of the user
   * @returns The user or null if the user is not found
   */
  public async findById(id: string): Promise<User | null> {
    const prismaUser: PrismaUser | null = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!prismaUser) {
      return null;
    }
    return {
      ...prismaUser,
      role: this.mapToDomainRole(prismaUser.role),
    } as User;
  }

  /**
   * Update a user
   * @param user - The user to update
   * @returns The updated user or null if the user is not found
   */
  public async update(user: User): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, deletedAt, role, ...userData } = user;
    const prismaUser: PrismaUser = {
      ...userData,
      role: this.mapToPrismaRole(role),
    } as PrismaUser;
    const updatedUser: PrismaUser = await this.prisma.user.update({
      where: { id },
      data: prismaUser,
    });
    return {
      ...updatedUser,
      role: this.mapToDomainRole(updatedUser.role),
    } as User;
  }

  /**
   * Delete a user
   * @param id - The id of the user
   * @returns The deleted user or null if the user is not found
   */
  public async delete(id: string): Promise<User | null> {
    const prismaUser: PrismaUser | null = await this.prisma.user.delete({
      where: { id },
    });
    if (!prismaUser) {
      return null;
    }
    return {
      ...prismaUser,
      role: this.mapToDomainRole(prismaUser.role),
    } as User;
  }
}
