import { Request, Response } from 'express';
import { usersService, User } from '.';

const getAllUsers = async (req: Request, res: Response) => {
  const users: User[] = await usersService.getAllUsers();
  return res.status(200).json({
    users,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const id = res.locals.userId;
  const user: User | undefined = await usersService.getUserById(parseInt(id, 10));
  if (!user) {
    return res.status(400).json({
      message: `User not found with id: ${id}`,
    });
  }
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
  const { updateUser } = res.locals;
  const result: boolean = await usersService.updateUser(updateUser);
  if (!result) {
    return res.status(400).json({
      error: true,
      message: `Cannot find user with id: ${updateUser.id}`,
    });
  }
  return res.status(204).send();
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
};

export default usersController;
