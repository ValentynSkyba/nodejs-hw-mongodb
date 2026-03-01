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
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToPublicDir } from '../utils/saveFileToPublicDir.js';

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
  console.log(req.file);
  console.log(req);
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  try {
    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToPublicDir(photo);
      }
    }

    const updateData = { ...req.body };
    if (photoUrl) updateData.photo = photoUrl;

    const result = await updateContact({ _id, userId }, updateData);

    if (!result || !result.data) {
      throw createHttpError(404, `Student with ${_id} not found`);
    }

    res.status(200).json({
      status: 200,
      message: `Successfully updated contact with id=${_id}`,
      data: result.data,
    });
  } catch (err) {
    console.error('Error in patchContactByIDController:', err);
    throw createHttpError(500, err.message || 'Internal server error');
  }
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
