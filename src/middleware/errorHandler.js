export const errorHeandler = (error, req, res, next) => {
  const { status = 500, message = 'Something went wrong. Server error' } =
    error;
  res.status(status).json({ status, message });
};
