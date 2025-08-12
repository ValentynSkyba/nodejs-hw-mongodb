import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routers/contactsRouts.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

// console.log(process.env);

export const startServer = () => {
  dotenv.config();
  console.log(`Server test ${process.env.PORT}`);

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  const port = Number(process.env.PORT) || 3000;

  app.listen(3000, () => console.log(`Server running on ${port} port`));
};
