import {
  getContacts,
  getContactByID,
  addContact,
  updateContactByID,
  deleteContactByID,
} from '../services/contactServices.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/Student.js';
import { parseContactFilters } from '../utils/filters/parsedContactFilters.js';

export const getContactController = async (req, res) => {
  // console.log(req.query);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactSortFields);
  const filters = parseContactFilters(req.query);
  const data = await getContacts({ page, perPage, sortBy, sortOrder, filters });
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

export const addContactController = async (req, res) => {
  //
  const data = await addContact(req.body);

  res
    .status(201)
    .json({ status: 201, message: 'Successfully add contact', data });
};

export const upsertContactByIDController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await updateContactByID(id, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upsert contact with id=${id}`,
    data,
  });
};

export const patchContactByIDController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactByID(id, req.body);

  if (!result) {
    throw createHttpError(404, `Student with ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully update contact with id=${id}`,
    data: result.data,
  });
};

export const deleteContactByIDController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContactByID(id);
  if (!data) {
    throw createHttpError(404, `Student with ${id} not found`);
  }

  res.status(204).send();
};
