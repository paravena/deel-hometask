import express from 'express';
import { getProfile } from '../middleware';

const router = express.Router();

router.get('/:id', getProfile, async (req, res) => {
  const { Contract } = req.app.get('models');
  console.log('Calling endpoint');
  const { id } = req.params;
  const contract = await Contract.findOne({ where: { id } });
  console.log('Contract', contract);
  if (!contract) return res.status(404).end();
  res.json(contract);
});

export default router;
