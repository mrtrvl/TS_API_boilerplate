import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

const newUserSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

const idSchema = Joi.object({
  id: Joi.number(),
});

const generateErrorMessage = (error: ValidationError, res: Response) => {
  const message = error.details.map((element) => element.message);
  return res.status(400).json({
    error: true,
    message,
  });
};

/**
 * Validate id as a number from req.params
 * If successful, write id to res.locals.id
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validate = await idSchema.validate({ id });
    if (validate.error) {
      return generateErrorMessage(validate.error, res);
    }
    res.locals.userId = validate.value.id;
    return next();
  } catch (error) {
    console.log(error);
  }
  return next();
};

/**
 * Validate create user input from req.body
 * If successful, write new user data into res.local.newUser
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    const validate = await newUserSchema.validate(newUser);
    if (validate.error) {
      return generateErrorMessage(validate.error, res);
    }
    res.locals.newUser = validate.value;
    return next();
  } catch (error) {
    console.log(error);
  }
  return next();
};

const usersValidators = {
  createUser,
  getUserById,
};

export default usersValidators;
