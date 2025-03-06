import * as Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  BCRYPT_ROUNDS: Joi.number().integer().min(4).max(12).required(),
});
