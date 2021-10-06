import { Request, Response } from 'express';

const pingController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Alive',
  });
};

export default pingController;
