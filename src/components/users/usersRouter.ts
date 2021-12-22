import express, { Router } from 'express';
import { usersController } from '.';
import usersValidators from './usersValidators';
import { isLoggedIn, isAdmin } from '../general';

const router: Router = express.Router();

router
  .post('/', usersValidators.createUser, usersController.createUser)
  .post('/login', usersValidators.login, usersController.login)
  .use(isLoggedIn)
  .get('/', isAdmin, usersController.getAllUsers)
  .get('/:id', usersValidators.getUserById, usersController.getUserById)
  .patch('/:id', usersValidators.getUserById, usersValidators.updateUser, usersController.updateUser)
  .delete('/:id', usersValidators.getUserById, usersController.deleteUser);

export default router;
