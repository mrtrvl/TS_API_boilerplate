import { INewUser, IUser, IUpdateUser } from '.';
import { hashService, jwtService } from '../general';
import db from '../../db';

/**
 * Returns list of users from database
 */
const getAllUsers = async () => {
  const users = db.users.filter((element) => element.status !== 'deleted');
  return users;
};

/**
 * Returns user by e-mail
 */
const getUserByEmail = async (email: string): Promise<IUser | undefined> => {
  const user = db.users.find((element) => element.email === email);
  return user;
};

/**
 * Returns user with specified id
 */
const getUserById = async (id: number): Promise<IUser | undefined> => {
  const user: IUser | undefined = db.users.find((element) => element.id === id && element.status !== 'deleted');
  return user;
};

/**
 * Inserts new user into database.
 * Retruns users id
 */
const createUser = async (newUser: INewUser): Promise<number | boolean> => {
  const existingUser = await getUserByEmail(newUser.email);
  if (existingUser) return false;
  const id = db.users.length + 1;
  const role = 'user';
  const status = 'active';
  const password = await hashService.hashPassword(newUser.password);
  const user: IUser = {
    id,
    role,
    status,
    ...newUser,
    password,
  };
  db.users.push(user);
  return id;
};

/**
 * Updates user
 * Returns true if successful
 */
const updateUser = async (user: IUpdateUser): Promise<boolean> => {
  const index = db.users.findIndex((element) => element.id === user.id);
  Object.assign(db.users[index], user);
  if (user.password) {
    const hashedPassword = await hashService.hashPassword(user.password);
    db.users[index].password = hashedPassword;
  }
  return true;
};

/**
 * Deletes user
 * Returns true
 */
const deleteUser = async (user: IUser): Promise<boolean> => {
  const index = db.users.findIndex((element) => element.id === user.id);
  db.users[index].status = 'deleted';
  return true;
};

const login = async (loginPassword: string, user: IUser): Promise<string | false> => {
  const match = await hashService.comparePasswords(loginPassword, user.password);
  if (!match) return false;
  const token = await jwtService.sign(user);
  if (!token) return false;
  return token;
};

const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  login,
};

export default usersService;
