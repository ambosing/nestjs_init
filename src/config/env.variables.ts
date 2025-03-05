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

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsBoolean()
  DB_SYNCHRONIZE: boolean;

  @IsBoolean()
  DB_LOGGING: boolean;

  // 기본값 할당
  constructor() {
    this.NODE_ENV = Environment.Development;
    this.PORT = 3000;
    this.DB_HOST = 'localhost';
    this.DB_PORT = 3306;
    this.DB_USERNAME = 'root';
    this.DB_PASSWORD = 'root';
    this.DB_DATABASE = 'root';
    this.DB_SYNCHRONIZE = false;
    this.DB_LOGGING = true;
  }
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
