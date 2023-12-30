import express, { NextFunction, Request, Response } from 'express';
import { getProfile } from '../middleware';
import { findAllContracts, findContractById } from '../services';

const router = express.Router();

router.get('/', getProfile, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = req.profile;
    const contracts = await findAllContracts(profile.id);
    res.json(contracts);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', getProfile, async ({ profile, params}, res: Response, next: NextFunction) => {
  try {
    const { id } = params;
    const contract = await findContractById(id, profile.id)
    if (!contract) return res.status(404).end();
    res.json(contract);
  } catch (error) {
    next(error)
  }
});

export default router;
