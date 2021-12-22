import { IUser } from './components/users';

interface Db {
  users: IUser[];
}
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
      email: 'john@doe.com',
      password: '$2b$10$XkQ/1HIyp4TCzdUxtQTq/ObKjJrKs8XECDHfA7hGR7ILOVUYazvge',
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
