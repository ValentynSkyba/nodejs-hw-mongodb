import StudentCollection from '../db/models/Student.js';
import { calcPaginationData } from '../utils/countPaginationData.js';

export const getContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const contacts = await StudentCollection.find().skip(skip).limit(perPage);
  const total = await StudentCollection.countDocuments();

  const paginationData = calcPaginationData({ page, perPage, total });

  return {
    contacts,
    total,
    ...paginationData,
  };
};

export const getContactByID = (contactId) =>
  StudentCollection.findById(contactId);

export const addContact = (payload) => StudentCollection.create(payload);

export const updateContactByID = async (_id, payload, options = {}) => {
  const result = await StudentCollection.findByIdAndUpdate(_id, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return { isNew, data: result.value };
};

export const deleteContactByID = (_id) =>
  StudentCollection.findByIdAndDelete(_id);
