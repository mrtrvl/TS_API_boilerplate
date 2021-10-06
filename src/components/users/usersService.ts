import { NewUser, User, UpdateUser } from '.';
import db from '../../db';

const getAllUsers = async () => {
  const { users } = db;
  return users;
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = db.users.find((element) => element.email === email);
  return user;
};

const getUserById = async (id: number): Promise<User | undefined> => {
  const user: User | undefined = db.users.find((element) => element.id === id);
  return user;
};

const createUser = async (newUser: NewUser): Promise<number | boolean> => {
  const existingUser = await getUserByEmail(newUser.email);
  if (existingUser) return false;
  const id = db.users.length + 1;
  const role = 'User';
  const user: User = {
    id,
    role,
    ...newUser,
  };
  db.users.push(user);
  return id;
};

const updateUser = async (updateUser: UpdateUser): Promise<boolean> => {
  const user = await getUserById(updateUser.id);
  if (!user) return false;
  const index = db.users.findIndex((element) => element.id === updateUser.id);
  Object.assign(db.users[index], updateUser);
  return true;
};

const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
};

export default usersService;
