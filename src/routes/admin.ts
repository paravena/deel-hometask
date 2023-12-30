import express, { Request, Response, NextFunction } from 'express';
import { validationResult, query } from 'express-validator';
import { DateTime } from 'luxon';
import { getBestProfession } from '../services';
const router = express.Router();

const isDateValidMiddleware = (name: string) => {
  return query(name).custom((value) => {
    const dateTime = DateTime.fromFormat(value, 'yyyy-MM-dd');
    if (!dateTime.isValid) {
      throw new Error(`Invalid date format for ${name}. Expected format is 'YYYY-MM-DD'`);
    }
    return true;
  });
};
router.get('/best-profession',
  [isDateValidMiddleware('start'), isDateValidMiddleware('end')],
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const start = DateTime.fromFormat(req.query.start as string, 'yyyy-MM-dd')
      .set({ hour: 0, minute: 0, second: 0 }).toFormat('yyyy-MM-dd HH:mm:ss');
    const end = DateTime.fromFormat(req.query.end as string, 'yyyy-MM-dd')
      .set({ hour: 23, minute: 59, second: 59 }).toFormat('yyyy-MM-dd HH:mm:ss');
    const result = await getBestProfession(start, end);
    res.json({ start, end, result });
  } catch (error) {
    next(error);
  }
});

export default router;
