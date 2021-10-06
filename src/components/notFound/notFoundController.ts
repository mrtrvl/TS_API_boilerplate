import { Request, Response } from 'express';

const pingController = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export default pingController;
