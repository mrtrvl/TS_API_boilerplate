import { Request, Response, NextFunction } from 'express';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  if (user.role !== 'admin') {
    return res.status(401).json({
      error: 'You have to be admin for this operatation',
    });
  }
  return next();
};

export default isAdmin;
