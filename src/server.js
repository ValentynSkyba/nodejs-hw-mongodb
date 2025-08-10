import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

// console.log(process.env);

export const startServer = () => {
  dotenv.config();
  console.log(`Server test ${process.env.PORT}`);

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to server',
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  const port = Number(process.env.PORT) || 3000;

  app.listen(3000, () => console.log(`Server running on ${port} port`));
};
