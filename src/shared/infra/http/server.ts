/* eslint-disable no-console */

import 'reflect-metadata';
import '../typeorm';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from 'errors/AppError';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

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

app.listen(5555, () => {
  console.log('Server running on port 5555');
});
