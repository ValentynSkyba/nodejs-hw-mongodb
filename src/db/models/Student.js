import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contact-constants.js';
import { handleSaveError, setUpdateSettings } from '../hooks.js';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: [...typeList],
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

studentSchema.post('save', handleSaveError);

studentSchema.pre('findOneAndUpdate', setUpdateSettings);

studentSchema.post('findOneAndUpdate', handleSaveError);

const StudentCollection = model('student', studentSchema);

export default StudentCollection;
