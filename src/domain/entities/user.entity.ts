// User Entity

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string | null;
  provider: string[];
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
