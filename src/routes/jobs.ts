import express, { NextFunction, Request, Response } from 'express';
import { getProfile } from '@/middleware';
import { findUnpaidJobs, payJob } from '@/services';
import { param, validationResult } from 'express-validator';

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

router.post('/:job_id/pay', [getProfile, paramsHasClientId], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const jobId = parseInt(req.params.job_id);
    const profile = req.profile;
    await payJob(jobId, profile);
    res.json({ message: `Job ${jobId} was paid successfully!` });
  } catch (error) {
    next(error);
  }
})

export default router;
