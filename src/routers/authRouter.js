import { Router } from 'express';

import { validateBody } from '../middleware/validateBody.js';
import { registrationSchema, loginSchema } from '../validation/authSchemas.js';
import {
  registerController,
  loginController,
  refreshSessionController,
  logoutUserController,
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

export default authRouter;
