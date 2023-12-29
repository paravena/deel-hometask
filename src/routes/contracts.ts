import express from 'express';
import { getProfile } from '../middleware';
import { Op } from 'sequelize';
import { sequelize } from '../model';

const router = express.Router();
const { Contract } = sequelize.models;

router.get('/', getProfile, async (req, res) => {
  const profile = req.profile;
  const contracts = await Contract.findAll({
    where: {
      status: {
        [Op.ne]: 'terminated'
      },
      ClientId: profile.id
    }
  });
  res.json(contracts);
});

router.get('/:id', getProfile, async (req, res) => {
  const { id } = req.params;
  const profile = req.profile;
  const contract = await Contract.findOne({
    where: {
      id,
      ClientId: profile.id
    }
  });
  if (!contract) return res.status(404).end();
  res.json(contract);
});

export default router;
