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
  console.log(id);
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

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
};

export default usersController;
