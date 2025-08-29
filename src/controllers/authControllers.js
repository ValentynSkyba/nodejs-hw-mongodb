import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../services/authServices.js';

const setupSession = (res, session) => {
  if (!session || !session._id) {
    throw new Error('Session object is invalid');
  }
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully register user! ',
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);
  // console.log(session);
  // res.cookie('refreshToken', {
  //   httpOnly: true,
  //   expires: session.refreshTokenValidUntil,
  // });

  // res.cookie('sessionId', {
  //   httpOnly: true,
  //   expires: session.refreshTokenValidUntil,
  // });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshSessionController = async (req, res) => {
  // console.log(req.cookies);
  const session = await refreshUserSession(req.cookies);

  // res.cookie('refreshToken', {
  //   httpOnly: true,
  //   expires: session.refreshTokenValidUntil,
  // });

  // res.cookie('sessionId', {
  //   httpOnly: true,
  //   expires: session.refreshTokenValidUntil,
  // });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refresh session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};
