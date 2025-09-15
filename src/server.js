import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';
import contactsRouter from './routers/contactsRouts.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHeandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

// console.log(process.env);

export const startServer = () => {
  dotenv.config();
  console.log(`Server test ${process.env.PORT}`);

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static('public'));

  app.use(logger);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHeandler);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  const port = Number(process.env.PORT) || 3000;

  app.listen(3000, () => console.log(`Server running on ${port} port`));
};
