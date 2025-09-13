// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { BooksModule } from "@/books/books.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@/user/user.module";
import { AuthModule } from "@/auth/auth.module";

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
