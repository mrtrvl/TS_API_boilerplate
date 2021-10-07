import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';
import { User, usersService } from '.';

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

const updateUserSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(30),
  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(30),
  email: Joi.string()
    .email(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  role: Joi.string()
    .alphanum(),
})
  .or('firstName', 'lastName', 'email', 'password', 'role');

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
    const user: User | undefined = await usersService.getUserById(validate.value.id);
    if (!user) {
      return res.status(404).json({
        message: `No user found with id: ${id}`,
      });
    }
    res.locals.user = user;
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

/**
 * Validate id as a number from req.params
 * Validate update user input from req.body
 * If successful, write id and update data into res.local.updateUser
 */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = req.body;

    const user = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    const validateUserData = await updateUserSchema.validate(user);
    if (validateUserData.error) {
      return generateErrorMessage(validateUserData.error, res);
    }
    // Remove undefined keys from object
    await Object.keys(validateUserData.value).forEach((key) => {
      if (validateUserData.value[key] === undefined) {
        delete validateUserData.value[key];
      }
    });
    res.locals.updateUser = {
      id: res.locals.user.id,
      ...validateUserData.value,
    };
    return next();
  } catch (error) {
    console.log(error);
  }
  return next();
};

const usersValidators = {
  createUser,
  getUserById,
  updateUser,
};

export default usersValidators;
