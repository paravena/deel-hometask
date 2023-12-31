import express, { NextFunction, Request, Response } from 'express';
import { getProfile } from '@/middleware';
import { param, validationResult } from 'express-validator';
import { findAllContracts, findContractById } from '@/services';

const router = express.Router();
const paramsHasId = param('id').isNumeric();

router.get('/', getProfile, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = req.profile;
    const contracts = await findAllContracts(profile.id);
    res.json(contracts);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', [getProfile, paramsHasId], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const contract = await findContractById(id, req.profile.id)
    if (!contract) return res.status(404).end();
    res.json(contract);
  } catch (error) {
    next(error)
  }
});

export default router;
