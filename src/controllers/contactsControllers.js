import StudentCollection from '../db/models/Student.js';

export const getContactController = async (req, res) => {
  const data = await StudentCollection.find();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIDController = async (req, res) => {
  // console.log(req.params);

  const contactId = req.params.contactId;
  const data = await StudentCollection.findById(contactId);

  if (!data) {
    return res.status(404).json({
      status: 404,
      message: `Student with ${contactId} not found`,
    });
  }

  res.json({
    status: 200,
    message: `Successfully find student with id:${contactId}`,
    data,
  });
};
