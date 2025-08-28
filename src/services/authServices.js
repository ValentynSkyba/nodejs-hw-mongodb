import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';

// console.log(randomBytes(30).toString('base64'));

import UserCollection from '../db/models/Users.js';
import SessionCollection from '../db/models/Session.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth-constants.js';

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + accessTokenLifeTime),
  refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifeTime),
});

export const findSession = (query) => SessionCollection.findOne(query);
export const findUser = (query) => UserCollection.findOne(query);

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return UserCollection.create({ ...payload, password: hashPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const session = createSession();
  // Deleted (new fun)
  // const accessToken = randomBytes(30).toString('base64');
  // const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    ...session,
    // Deleted (new fun)
    // accessToken,
    // refreshToken,
    // accessTokenValidUntil: new Date(Date.now() + accessTokenLifeTime),
    // refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifeTime),
  });
};

export const refreshUserSession = async ({ refreshToken, sessionId }) => {
  // console.log(refreshToken);
  const oldSession = await findSession({ refreshToken, _id: sessionId });
  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  await SessionCollection.findByIdAndDelete(oldSession._id);
  if (oldSession.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...newSession,
  });
};
