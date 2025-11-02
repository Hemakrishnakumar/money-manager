import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { appConfig } from './config/app.config';
import { authConfig } from './config/auth.config';
import { databaseConfig } from './config/database.config';
import { mailerConfig } from './config/mail.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [appConfig, authConfig, databaseConfig, mailerConfig] }), DatabaseModule, AuthModule]
})
export class AppModule {}
