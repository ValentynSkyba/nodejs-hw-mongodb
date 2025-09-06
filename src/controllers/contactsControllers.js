import {
  getContacts,
  // getContactByID,
  addContact,
  updateContact,
  deleteContact,
  getContact,
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
  const { _id: userId } = req.user;

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters: { ...filters, userId },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIDController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await getContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, `Student with ${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully find student with id:${_id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  // console.log(req.file);
  // console.log(req);

  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId }, req.file);

  res
    .status(201)
    .json({ status: 201, message: 'Successfully add contact', data });
};

export const upsertContactByIDController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await updateContact(
    { _id, userId },
    { ...req.body, userId },
    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upsert contact with id=${_id}`,
    data,
  });
};

export const patchContactByIDController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Student with ${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully update contact with id=${_id}`,
    data: result.data,
  });
};

export const deleteContactByIDController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContact({ _id, userId });
  if (!data) {
    throw createHttpError(404, `Student with ${_id} not found`);
  }

  res.status(204).send();
};
