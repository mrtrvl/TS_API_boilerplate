import express, { Application } from 'express';
import { pingRouter } from './components/ping';
import { usersRouter } from './components/users';
import { notFoundRouter } from './components/notFound';

const app: Application = express();

// Json middleware
app.use(express.json());

// Routes
app.use('/ping', pingRouter);
app.use('/users', usersRouter);
app.use(notFoundRouter);

export default app;
