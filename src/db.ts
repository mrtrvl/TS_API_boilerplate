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
      role: 'admin',
      email: 'john@doe.com',
      password: 'password',
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'user',
      email: 'doe@doe.com',
      password: 'password',
      status: 'deleted',
    },
  ],
};

export default db;
