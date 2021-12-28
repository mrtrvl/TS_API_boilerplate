import { Request, Response, NextFunction } from 'express';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    if (user.role !== 'admin') {
      throw new Error('You have to be admin for this operatation');
      // return res.status(401).json({
      //   error: 'You have to be admin for this operatation',
      // });
    }
    return next();
  } catch (error: any) {
    error.code = 401;
    return next(error);
  }
};

export default isAdmin;
