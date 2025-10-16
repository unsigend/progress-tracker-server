// import dependencies
import { Injectable } from "@nestjs/common";

// import types
import { User, Book } from "@prisma/client";
import { UserRole } from "@prisma/client";

@Injectable()
export class AuthorizationService {
  constructor() {}

  public canModifyBook(user: User, book: Book): boolean {
    return user.role === UserRole.ADMIN || user.id === book.createdById;
  }

  public canDeleteBook(user: User, book: Book): boolean {
    return user.role === UserRole.ADMIN || user.id === book.createdById;
  }
}
