import { Profile } from '../model';
import { findProfile } from './profiles';
import { getTotalJobSum } from './jobs';

const MAXIMUM_DEPOSIT_PERCENTAGE = 0.25;

function isDepositAllowed(amount: number, totalJobSum: number) {
  return amount < totalJobSum * MAXIMUM_DEPOSIT_PERCENTAGE;
}
export async function updateBalance(clientId: number, amount: number) {
  const client = await findProfile(clientId);
  if (!client) {
    throw Error('Client not found');
  }

  const totalJobSum = await getTotalJobSum(clientId);
  if (!isDepositAllowed(amount, totalJobSum)) {
    throw Error('Deposit exceed maximum allowed')
  }

  return Profile.increment(
    { balance: amount },
    { where: { id: clientId } },
  );
}
