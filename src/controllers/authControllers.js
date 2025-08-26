import createHttpError from 'http-errors';

import { registerUser } from '../services/authServices.js';

export const registerController = async (req, res) => {
  await registerUser(req.body);

  res.status(201).json({
    message: 'Successfully register user! ',
  });
};
