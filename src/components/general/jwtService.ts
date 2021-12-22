import jwt from 'jsonwebtoken';
import config from '../../config';
import { IUser } from '../users/interfaces';

const jwtService = {
  sign: async (user: IUser) => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, config.jwt.secret, { expiresIn: '1h' });
    return token;
  },
  verify: async (token: string) => {
    try {
      const verify = await jwt.verify(token, config.jwt.expiresIn);
      return verify;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};

export default jwtService;
