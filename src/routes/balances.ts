import express, { NextFunction, Request, Response } from 'express';
import { getProfile } from '../middleware';
import { body, validationResult, param } from 'express-validator';
import { updateBalance } from '@/services';

const router = express.Router();

const bodyHasAmount = body('amount').isNumeric();
const paramsHasClientId = param('clientId').isNumeric();
router.post('/deposit/:clientId', [getProfile, bodyHasAmount, paramsHasClientId], async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const clientId = parseInt(req.params.clientId);
    const amount = req.body.amount;
    await updateBalance(clientId, amount);
    res.json({ message: `Deposit done for user ${clientId}`})
  } catch (error) {
    next(error)
  }
});

export default router;
