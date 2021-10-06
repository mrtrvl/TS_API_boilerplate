import { Request, Response } from 'express';

const pingController = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
  });
};

export default pingController;
