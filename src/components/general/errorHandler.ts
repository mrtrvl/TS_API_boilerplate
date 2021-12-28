/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { logger } from '.';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${req.path}, ${err.message}`);
  return res.status(err.code).json({
    error: true,
    message: err.message,
  });
};

export default errorHandler;
