import { NewUser, User, UpdateUser } from '.';
import db from '../../db';

const getAllUsers = async () => {
  const { users } = db;
  return users;
};

/**
 * Returns list of users from database
 */
const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = db.users.find((element) => element.email === email);
  return user;
};

/**
 * Returns user with specified id
 */
const getUserById = async (id: number): Promise<User | undefined> => {
  const user: User | undefined = db.users.find((element) => element.id === id);
  return user;
};

/**
 * Inserts new user into database.
 * Retruns users id
 */
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

/**
 * Updates user
 * Returns true if successful
 */
const updateUser = async (updateUser: UpdateUser): Promise<boolean> => {
  const index = db.users.findIndex((element) => element.id === updateUser.id);
  Object.assign(db.users[index], updateUser);
  return true;
};

/**
 * Deletes user
 * Returns true
 */
const deleteUser = async (user: User): Promise<boolean> => {
  const index = db.users.findIndex((element) => element.id === user.id);
  db.users.splice(index, 1);
  return true;
};

const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};

export default usersService;
