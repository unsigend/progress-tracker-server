class CreateBookDto {
  title: string;
  author?: string;
  description?: string;
  pages?: number;
  ISBN?: string;
}

class UpdateBookDto {
  title?: string;
  author?: string;
  description?: string;
  pages?: number;
  ISBN?: string;
}

class QueryBookDto {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export { CreateBookDto, UpdateBookDto, QueryBookDto };
