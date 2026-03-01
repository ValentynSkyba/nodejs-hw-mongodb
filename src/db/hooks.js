export const handleSaveError = (error, doc, next) => {
  // console.log(error);
  // console.log(error.name);
  // console.log(error.code)

  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

  next();
};

export const setUpdateSettings = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
