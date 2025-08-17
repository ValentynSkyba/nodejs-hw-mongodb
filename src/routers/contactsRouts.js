import { Router } from 'express';
import {
  getContactController,
  getContactByIDController,
  addContactController,
  upsertContactByIDController,
  patchContactByIDController,
  deleteContactByIDController,
} from '../controllers/contactsControllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactController);

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIDController));

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.put('/:id', ctrlWrapper(upsertContactByIDController));

contactsRouter.patch('/:id', ctrlWrapper(patchContactByIDController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactByIDController));

export default contactsRouter;
