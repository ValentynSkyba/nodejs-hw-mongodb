import { Router } from 'express';
import {
  getContactController,
  getContactByIDController,
} from '../controllers/contactsControllers.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactController);

contactsRouter.get('/:contactId', getContactByIDController);

export default contactsRouter;
