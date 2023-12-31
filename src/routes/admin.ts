import express, { Request, Response, NextFunction } from 'express';
import { query } from 'express-validator';
import { DateTime } from 'luxon';
import { getBestClients, getBestProfession } from '../services';
import { validateRequest } from '../middleware';

const router = express.Router();

const isDateValid = (name: string) => {
  return query(name).custom((value) => {
    const dateTime = DateTime.fromFormat(value, 'yyyy-MM-dd');
    if (!dateTime.isValid) {
      throw new Error(`Invalid date format for ${name}. Expected format is 'YYYY-MM-DD'`);
    }
    return true;
  });
};

const isLimitPresent = query('limit').default(2).isNumeric();

function sanitizeDate(dt: string, time: { hour: number, minute: number, second: number }) {
  return DateTime.fromFormat(dt, 'yyyy-MM-dd').set(time).toFormat('yyyy-MM-dd HH:mm:ss');
}

router.get('/best-profession', [
    isDateValid('start'),
    isDateValid('end'),
    validateRequest
  ],
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const start = sanitizeDate(req.query.start as string, { hour: 0, minute: 0, second: 0 });
    const end = sanitizeDate(req.query.end as string, { hour: 23, minute: 59, second: 59 });
    const result = await getBestProfession(start, end);
    res.json({ start, end, result });
  } catch (error) {
    next(error);
  }
});

router.get('/best-clients', [
    isDateValid('start'),
    isDateValid('end'),
    isLimitPresent,
    validateRequest
  ],
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const start = sanitizeDate(req.query.start as string, { hour: 0, minute: 0, second: 0 });
    const end = sanitizeDate(req.query.end as string, { hour: 23, minute: 59, second: 59 });
    const limit = parseInt(req.query.limit as string);
    const result = await getBestClients(start, end, limit);
    res.json({ start, end, limit, result });
  } catch (error) {
    next(error);
  }
})

export default router;
