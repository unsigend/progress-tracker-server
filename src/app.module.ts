// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { BooksModule } from "@/books/books.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@/user/user.module";
import { AuthModule } from "@/auth/auth.module";

// import guards
import { AuthGuard } from "@/guards/auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
