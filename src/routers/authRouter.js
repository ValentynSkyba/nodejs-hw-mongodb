import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middleware/validateBody.js';
import {
  registrationSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/authSchemas.js';
import {
  registerController,
  loginController,
  refreshSessionController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registrationSchema),
  registerController,
);

authRouter.post('/login', validateBody(loginSchema), loginController);

authRouter.post('/refresh', refreshSessionController);

authRouter.post('/logout', logoutUserController);

authRouter.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
