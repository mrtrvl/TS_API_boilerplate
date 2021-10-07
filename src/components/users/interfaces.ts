interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'deleted';
}

interface User extends NewUser {
  id: number;
  role: 'admin' | 'user';
  status: 'active' | 'deleted';
}

interface Login {
  email: string;
  password: string;
}

export {
  User,
  NewUser,
  UpdateUser,
  Login,
};
