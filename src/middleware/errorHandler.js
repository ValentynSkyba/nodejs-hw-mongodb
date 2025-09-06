// export const errorHeandler = (error, req, res, next) => {
//   const { status = 500, message = 'Something went wrong. Server error' } =
//     error;
//   res.status(status).json({ status, message });
// };

export const errorHeandler = (error, req, res, next) => {
  // Логи в консоль
  console.error('--- ERROR HANDLER ---');
  console.error('Message:', error.message);
  console.error('Stack:', error.stack);
  console.error('---------------------');

  const { status = 500, message = 'Something went wrong. Server error' } =
    error;

  res.status(status).json({
    status,
    message,
  });
};
