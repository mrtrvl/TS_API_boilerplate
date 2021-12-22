interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'deleted';
}

interface IUser extends INewUser {
  id: number;
  role: 'admin' | 'user';
  status: 'active' | 'deleted';
}

interface ILogin {
  email: string;
  password: string;
}

export {
  IUser,
  INewUser,
  IUpdateUser,
  ILogin,
};
