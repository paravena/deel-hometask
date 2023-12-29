export default function errorHandlerMiddleware(err, _req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
  next();
}
