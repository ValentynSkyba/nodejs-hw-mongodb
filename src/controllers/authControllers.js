import { registerUser, loginUser } from '../services/authServices.js';

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
  res.cookie('refreshToken', {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    data: {
      accessToken: session.accessToken,
    },
  });
};
