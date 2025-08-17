import { Router } from 'express';
import {
  getContactController,
  getContactByIDController,
  addContactController,
  upsertContactByIDController,
  patchContactByIDController,
  deleteContactByIDController,
} from '../controllers/contactsControllers.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactController);

contactsRouter.get('/:contactId', getContactByIDController);

contactsRouter.post('/', addContactController);

contactsRouter.put('/:id', upsertContactByIDController);

contactsRouter.patch('/:id', patchContactByIDController);

contactsRouter.delete('/:id', deleteContactByIDController);

export default contactsRouter;
