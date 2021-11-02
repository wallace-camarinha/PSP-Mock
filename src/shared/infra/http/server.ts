/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Request, Response, NextFunction, urlencoded } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';

import '@shared/container';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

// Error handler
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(5599, () => {
  console.log('Server running on port 5599');
});
