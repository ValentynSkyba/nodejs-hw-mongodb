import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import StudentCollection from './db/models/Student.js';

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

  app.get('/contacts', async (req, res) => {
    const data = await StudentCollection.find();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    // console.log(req.params);

    const contactId = req.params.contactId;
    const data = await StudentCollection.findById(contactId);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Student with ${contactId} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully find student with id:${contactId}`,
      data,
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
