import { Request, Response, NextFunction } from 'express';

export default function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
  next();
}
