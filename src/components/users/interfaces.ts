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
  role?: string;
}

interface User extends NewUser {
  id: number;
  role: string;
}

export {
  User,
  NewUser,
  UpdateUser,
};
