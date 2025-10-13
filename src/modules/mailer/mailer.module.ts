// import dependencies
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// import services
import { MailerService } from "@modules/mailer/mailer.service";

@Module({
  imports: [ConfigModule],
  providers: [MailerService],
  exports: [MailerService],
  controllers: [],
})
export class MailerModule {}
