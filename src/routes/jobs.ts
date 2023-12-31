import express, { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { getProfile, validateRequest } from '../middleware';
import { findUnpaidJobs, payJob } from '../services';

const router = express.Router();

const paramsHasClientId = param('clientId').isNumeric();

router.get('/unpaid', getProfile, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = req.profile;
    const unpaidJobs = await findUnpaidJobs(profile.id);
    res.json(unpaidJobs);
  } catch (error) {
    next(error)
  }
})

router.post('/:job_id/pay', [
  getProfile,
  paramsHasClientId,
  validateRequest
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = parseInt(req.params.job_id);
    const profile = req.profile;
    await payJob(jobId, profile);
    res.json({ message: `Job ${jobId} was paid successfully!` });
  } catch (error) {
    next(error);
  }
})

export default router;
