import express from 'express';
import { getProfile } from '../middleware';
import { findUnpaidJobs, payJob } from '../services';

const router = express.Router();

router.get('/unpaid', getProfile, async (req, res, next) => {
  try {
    const profile = req.profile;
    const unpaidJobs = await findUnpaidJobs(profile.id);
    res.json(unpaidJobs);
  } catch (error) {
    next(error)
  }
})

router.post('/:job_id/pay', getProfile, async (req, res, next) => {
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
