import Joi from 'joi';
import { typeList } from '../constants/contact-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name must be exist',
    'string.base': 'title must be string',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.number(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
