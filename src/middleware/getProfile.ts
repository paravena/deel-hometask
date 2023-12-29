import { Request, Response, NextFunction } from 'express';
import { Profile as ProfileModel } from '../model';

declare module 'express-serve-static-core' {
  interface Request {
    profile?: ProfileModel;
  }
}
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { Profile } = req.app.get('models');
  const profile = await Profile.findOne({
    where: { id: req.get('profile_id') || 0 },
  });
  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};

export default getProfile;
