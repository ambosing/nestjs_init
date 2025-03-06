import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables, validate } from './env.variables';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
  ],
  providers: [EnvironmentVariables],
  exports: [EnvironmentVariables],
})
export class AppConfigModule {}
