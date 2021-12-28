import { NextFunction, Request, Response } from 'express';
import { usersService, IUser } from '.';

const getAllUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await usersService.getAllUsers();
  return res.status(200).json({
    users,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { user } = res.locals;
  return res.status(200).json({
    user,
  });
};

const createUser = async (req: Request, res: Response) => {
  const { newUser } = res.locals;
  const result: number | boolean = await usersService.createUser(newUser);
  if (!result) {
    return res.status(400).json({
      error: true,
      message: `User with email: ${newUser.email} already exists`,
    });
  }
  return res.status(201).json({ id: result });
};

const updateUser = async (req: Request, res: Response) => {
  const user = res.locals.updateUser;
  await usersService.updateUser(user);
  return res.status(204).send();
};

const deleteUser = async (req: Request, res: Response) => {
  const { user } = res.locals;
  await usersService.deleteUser(user);
  return res.status(204).send();
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const { loginPassword } = res.locals;
    const token = await usersService.login(loginPassword, user);
    if (!token) {
      throw new Error('Wrong password');
    /*  return res.status(401).json({
        message: 'Wrong password',
      }); */
    }
    return res.status(200).send({
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};

export default usersController;
