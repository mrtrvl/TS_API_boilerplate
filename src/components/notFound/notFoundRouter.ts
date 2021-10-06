import express, { Router } from 'express';
import { notFoundController } from '.';

const router: Router = express.Router();

router.get('*', notFoundController);

export default router;
