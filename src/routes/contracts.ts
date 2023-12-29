import express from 'express';
import { getProfile } from '../middleware';
import { findAllContracts, findContractById } from '../services';

const router = express.Router();

router.get('/', getProfile, async (req, res, next) => {
  try {
    const profile = req.profile;
    const contracts = await findAllContracts(profile.id);
    res.json(contracts);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', getProfile, async ({ profile, params, next }, res) => {
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
