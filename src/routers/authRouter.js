import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middleware/validateBody.js';
import {
  registrationSchema,
  loginSchema,
  requestResetEmailSchema,
} from '../validation/authSchemas.js';
import {
  registerController,
  loginController,
  refreshSessionController,
  logoutUserController,
  requestResetEmailController,
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
export default authRouter;
