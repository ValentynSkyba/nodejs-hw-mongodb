import { getContacts, getContactByID } from '../services/contactServices.js';
import createHttpError from 'http-errors';

export const getContactController = async (req, res) => {
  const data = await getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIDController = async (req, res) => {
  // console.log(req.params);

  const contactId = req.params.contactId;
  const data = await getContactByID(contactId);

  if (!data) {
    throw createHttpError(404, `Student with ${contactId} not found`);
    //     ------ without library
    // const error = new Error(`Student with ${contactId} not found`);
    // error.status = 404;
    //     throw error;
    // return res.status(404).json({
    //   status: 404,
    //   message: `Student with ${contactId} not found`,
    // });
  }

  res.json({
    status: 200,
    message: `Successfully find student with id:${contactId}`,
    data,
  });
};
