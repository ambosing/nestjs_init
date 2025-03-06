import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  Max,
  Min,
  validateSync,
  IsString,
  IsBoolean,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

@Injectable()
export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  @IsString()
  DB_HOST: string = 'localhost';

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number = 3306;

  @IsString()
  DB_USERNAME: string = 'root';

  @IsString()
  DB_PASSWORD: string = 'root';

  @IsString()
  DB_DATABASE: string = 'db';

  @IsBoolean()
  DB_SYNCHRONIZE: boolean = false;

  @IsBoolean()
  DB_LOGGING: boolean = true;

  // TypeORM 설정 객체를 반환하는 getter 메서드
  get getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mariadb', // 또는 'mysql', 'postgres', 등
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUsername,
      password: this.dbPassword,
      database: this.dbDatabase,
      synchronize: this.dbSynchronize,
      logging: this.dbLogging,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'], // 필요한 경우
      // ... 기타 TypeORM 옵션 ...
    };
  }

  get nodeEnv(): Environment {
    return this.NODE_ENV;
  }

  get port(): number {
    return this.PORT;
  }

  get dbHost(): string {
    return this.DB_HOST;
  }

  get dbPort(): number {
    return this.DB_PORT;
  }

  get dbUsername(): string {
    return this.DB_USERNAME;
  }

  get dbPassword(): string {
    return this.DB_PASSWORD;
  }

  get dbDatabase(): string {
    return this.DB_DATABASE;
  }

  get dbSynchronize(): boolean {
    return this.DB_SYNCHRONIZE;
  }

  get dbLogging(): boolean {
    return this.DB_LOGGING;
  }
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  console.log(validatedConfig.DB_PASSWORD);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
