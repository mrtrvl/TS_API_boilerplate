import express, { Router } from 'express';
import { usersController } from '.';
import usersValidators from './usersValidators';

const router: Router = express.Router();

router
  .get('/', usersController.getAllUsers)
  .get('/:id', usersValidators.getUserById, usersController.getUserById)
  .post('/', usersValidators.createUser, usersController.createUser);

export default router;
