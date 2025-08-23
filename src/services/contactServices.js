import StudentCollection from '../db/models/Student.js';
import { calcPaginationData } from '../utils/countPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = StudentCollection.find();

  if (filters.contactType) {
    contactQuery.where('contactType').equals(filters.contactType);
  }

  if (typeof filters.isFavourite === 'boolean') {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

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
