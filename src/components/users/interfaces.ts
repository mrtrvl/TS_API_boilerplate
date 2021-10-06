interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface User extends NewUser {
  id: number;
  role: string;
}

export {
  User,
  NewUser,
};
