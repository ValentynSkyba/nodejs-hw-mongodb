import StudentCollection from '../db/models/Student.js';
import { calcPaginationData } from '../utils/countPaginationData.js';
import { getEnvVar } from '../utils/getEnvVar.js';

import { saveFileToPublicDir } from '../utils/saveFileToPublicDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudnary.js';

const enableCloundinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = StudentCollection.find({ userId: filters.userId });

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

export const getContact = (query) => StudentCollection.findOne(query);

export const addContact = async (payload, file) => {
  let photo = null;
  if (file) {
    if (enableCloundinary) {
      photo = await saveFileToCloudinary(file);
    } else {
      photo = await saveFileToPublicDir(file);
    }
  }
  return StudentCollection.create({ ...payload, photo });
};

export const updateContact = async (query, { payload }, options = {}) => {
  const result = await StudentCollection.findOneAndUpdate(query, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return { isNew, data: result.value };
};

export const deleteContact = (query) =>
  StudentCollection.findOneAndDelete(query);
