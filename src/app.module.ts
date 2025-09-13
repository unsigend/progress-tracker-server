// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { BooksModule } from "@/books/books.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
