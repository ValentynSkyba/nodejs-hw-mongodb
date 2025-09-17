import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isVailidID = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(404, `${id} not valid id`);
  }
  next();
};
