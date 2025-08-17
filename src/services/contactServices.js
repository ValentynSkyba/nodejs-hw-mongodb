import StudentCollection from '../db/models/Student.js';

export const getContacts = () => StudentCollection.find();

export const getContactByID = (contactId) =>
  StudentCollection.findById(contactId);

export const addContact = (payload) => StudentCollection.create(payload);

export const updateContactByID = async (_id, payload, options = {}) => {
  const result = await StudentCollection.findByIdAndUpdate(_id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return { isNew, data: result.value };
};

export const deleteContactByID = (_id) =>
  StudentCollection.findByIdAndDelete(_id);
