import jwt from 'jsonwebtoken';
import { logger } from '..';
import config from '../../../config';
import { IUser } from '../../users/interfaces';

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
      const verify = await jwt.verify(token, config.jwt.secret);
      return verify;
    } catch (error) {
      logger.error(error);
      return false;
    }
  },
};

export default jwtService;
