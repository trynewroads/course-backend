import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),
  DEBUG_REQUEST: Joi.boolean().truthy('true').falsy('false').default(false),
  DEFAULT_USER: Joi.string().default('admin'),
  DEFAULT_PASS: Joi.string().default('12345678'),
  JWT_SECRET: Joi.string().default('secretKey'),
  ENABLE_AUTH: Joi.boolean().truthy('true').falsy('false').default(true),
  USE_DB: Joi.boolean().truthy('true').falsy('false').default(false),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('todo_user'),
  DB_PASS: Joi.string().default('todo_pass'),
  DB_NAME: Joi.string().default('todo_db'),
});
