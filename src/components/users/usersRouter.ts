import express, { Router } from 'express';
import { usersController } from '.';
import usersValidators from './usersValidators';

const router: Router = express.Router();

router
  .get('/', usersController.getAllUsers)
  .post('/', usersValidators.createUser, usersController.createUser)
  .get('/:id', usersValidators.getUserById, usersController.getUserById)
  .patch('/:id', usersValidators.getUserById, usersValidators.updateUser, usersController.updateUser)
  .delete('/:id', usersValidators.getUserById, usersController.deleteUser)
  .post('/login', usersValidators.login, usersController.login);

export default router;
