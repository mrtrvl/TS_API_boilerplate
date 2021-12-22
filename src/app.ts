import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { pingRouter } from './components/ping';
import { usersRouter } from './components/users';
import { notFoundRouter } from './components/notFound';
import swaggerDocument from '../openapi.json';
import config from './config';

const app: Application = express();

// CORS middleware
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Json middleware
app.use(express.json());

// Routes
app.use('/', (req, res) => {
  res.status(200).send(
    `
      <h1>Welcome to TS API boilerplate</h1>
      <a href="http://localhost:${config.port}/api-docs">Link to API documentation</a>
    `,
  );
});
app.use('/ping', pingRouter);
app.use('/users', usersRouter);
app.use(notFoundRouter);

export default app;
