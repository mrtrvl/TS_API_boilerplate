import { Request, Response, NextFunction } from 'express';
import { jwtService } from '..';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.headers.authorization;
    const token = authHeaders?.split(' ')[1];
    if (token) {
      const payload = await jwtService.verify(token);
      if (!payload) {
        return res.status(401).json({
          error: 'Token is not valid',
        });
      }
      res.locals.user = payload;
      return next();
    }
    return res.status(401).json({
      error: 'No token provided',
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default isLoggedIn;
