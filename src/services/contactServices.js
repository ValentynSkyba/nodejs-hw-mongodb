import StudentCollection from '../db/models/Student.js';

export const getContacts = () => StudentCollection.find();

export const getContactByID = (contactId) =>
  StudentCollection.findById(contactId);
