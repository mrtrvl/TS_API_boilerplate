import { User } from './components/users';

interface Db {
  users: User[];
}
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      role: 'User',
      email: 'john@doe.com',
      password: 'password',
    },
  ],
};

export default db;
