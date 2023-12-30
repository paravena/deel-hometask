import { Profile } from '../model';

export async function findProfile(profileId: number) {
  return Profile.findOne({
    where: { id: profileId }
  });
}
