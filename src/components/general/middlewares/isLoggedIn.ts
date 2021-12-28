import { Request, Response, NextFunction } from 'express';
import { jwtService, logger } from '..';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.headers.authorization;
    const token = authHeaders?.split(' ')[1];
    if (!token) {
      logger.error('No token');
      return res.status(401).json({
        error: 'No token provided',
      });
    }
    const payload = await jwtService.verify(token);
    if (!payload) {
      logger.error('Invalid token');
      return res.status(401).json({
        error: 'Token is not valid',
      });
    }
    res.locals.user = payload;
    return next();
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export default isLoggedIn;
