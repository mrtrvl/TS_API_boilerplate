import { Request, Response, NextFunction } from 'express';
import { jwtService } from '..';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.headers.authorization;
    const token = authHeaders?.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }
    const payload = await jwtService.verify(token);
    if (!payload) {
      throw new Error('Token is not valid');
    }
    res.locals.user = payload;
    return next();
  } catch (error: any) {
    error.code = 401;
    return next(error);
  }
};

export default isLoggedIn;
