// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { BooksModule } from "@/books/books.module";

// import config
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    // general modules
    BooksModule,

    // config module
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: ".env",
    }),
  ],
})
export class AppModule {}
