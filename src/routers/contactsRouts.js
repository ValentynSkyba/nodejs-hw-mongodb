import { Router } from 'express';
import {
  getContactController,
  getContactByIDController,
  addContactController,
  upsertContactByIDController,
} from '../controllers/contactsControllers.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactController);

contactsRouter.get('/:contactId', getContactByIDController);

contactsRouter.post('/', addContactController);

contactsRouter.put('/:id', upsertContactByIDController);

export default contactsRouter;
