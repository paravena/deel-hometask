import { Contract, ContractStatus, Job, Profile, sequelize } from '@/model';
import { Op, Sequelize, Transaction } from 'sequelize';
import { findContractorById } from './contracts';


export async function findJobById(jobId: number, profileId: number) {
  return Job.findOne({
    where: {
      id: jobId,
    },
    include: [{
      model: Contract,
      where: {
        status: ContractStatus.IN_PROGRESS,
        ClientId: profileId,
      },
    }],
  });
}

export const hasEnoughBalanceToPayJob = (profile: Profile, job: Job) =>
  profile.balance >= job.price;

export async function findUnpaidJobs(profileId: number) {
  return Job.findAll({
    where: {
      paid: {
        [Op.is]: null,
      },
    },
    include: [{
      model: Contract,
      where: {
        status: ContractStatus.IN_PROGRESS,
        [Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
    }],
    order: [
      ['ContractId', 'DESC'],
    ],
  });
}

async function updateProfileBalance(id: number, balance: number, transaction: Transaction) {
   return Profile.update(
     { balance },
     {
       where: { id },
       transaction,
     },
   );
}

async function updateJobStatusToPaid(job: Job, transaction: Transaction) {
  return Job.update({
      paid: 1,
      paymentDate: new Date(),
    },
    {
      where: { id: job.id },
      transaction,
    },
  );
}
async function updateBalances(client: Profile, contractor: Profile, job: Job) {
  const newClientBalance = client.balance - job.price;
  const newContractorBalance = contractor.balance + job.price;
  return sequelize.transaction(async (transaction) => {
    await updateProfileBalance(
      client.id,
      newClientBalance,
      transaction,
    );
    await updateProfileBalance(
      contractor.id,
      newContractorBalance,
      transaction,
    );
    await updateJobStatusToPaid(job, transaction);
  })

}
export async function payJob(jobId: number, profile: Profile) {
  const job = await findJobById(jobId, profile.id);
  const contractor = await findContractorById(job.Contract.ContractorId);
  if (!hasEnoughBalanceToPayJob(profile, job)) {
    throw new Error('Not enough funds to pay the job')
  }
  await updateBalances(
    profile,
    contractor,
    job,
  );
}

export async function getTotalJobSum(clientId: number) {
  const result = await Job.findOne({
    attributes: [
      [Sequelize.fn('sum', Sequelize.col('price')), 'totalJobSum'],
    ],
    include: [{
      model: Contract,
      where: {
        status: ContractStatus.IN_PROGRESS,
        ClientId: clientId,
      },
    }],
    raw: true,
  });
  return parseFloat(result['totalJobSum'] || '0.0');
}
