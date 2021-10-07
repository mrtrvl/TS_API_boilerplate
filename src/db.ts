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
      password: 'asas',
      status: 'active',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'user',
      email: 'doe@doe.com',
      password: '$2b$10$tqXQKLY/jmdy29y9Iz8Tlu6Eg4pz9NogX7nnv3PGxiphfsVCfAWgC',
      status: 'deleted',
    },
  ],
};

export default db;
