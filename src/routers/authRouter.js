import { Router } from 'express';

import { validateBody } from '../middleware/validateBody.js';
import { registrationSchema, loginSchema } from '../validation/authSchemas.js';
import { registerController } from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registrationSchema),
  registerController,
);

export default authRouter;
