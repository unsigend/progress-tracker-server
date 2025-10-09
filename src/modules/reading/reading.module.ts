// import dependencies
import { Module } from "@nestjs/common";

// import modules
import { DatabaseModule } from "@modules/database/database.module";
import { UserBookModule } from "@/modules/reading/userBook/userBook.module";

@Module({
  imports: [DatabaseModule, UserBookModule],
  providers: [],
  controllers: [],
  exports: [UserBookModule],
})
export class ReadingModule {}
