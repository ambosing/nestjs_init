import * as Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  BCRYPT_ROUNDS: Joi.number().integer().min(4).max(12).required(),
  SENTRY_DSN: Joi.string().uri().required(),
  SENTRY_RELEASE: Joi.string().required(),
  SENTRY_SERVER_NAME: Joi.string().required(),
  SENTRY_TRACES_SAMPLE_RATE: Joi.number().min(0).max(1).required(),
  SENTRY_PROFILING_SAMPLE_RATE: Joi.number().min(0).max(1).required(),
});
