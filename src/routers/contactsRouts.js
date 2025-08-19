import { Router } from 'express';
import createHttpError from 'http-errors';
import {
  getContactController,
  getContactByIDController,
  addContactController,
  upsertContactByIDController,
  patchContactByIDController,
  deleteContactByIDController,
} from '../controllers/contactsControllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contactsSchemas.js';

import { validateBody } from '../middleware/validateBody.js';

import { isVailidID } from '../middleware/isVailidID.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactController);

contactsRouter.get('/:id', isVailidID, ctrlWrapper(getContactByIDController));

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  isVailidID,
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactByIDController),
);

contactsRouter.patch(
  '/:id',
  isVailidID,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactByIDController),
);

contactsRouter.delete(
  '/:id',
  isVailidID,
  ctrlWrapper(deleteContactByIDController),
);

export default contactsRouter;
