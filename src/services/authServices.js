import UserCollection from '../db/models/Users.js';

export const registerUser = async (payload) => {
  return UserCollection.create(payload);
};
