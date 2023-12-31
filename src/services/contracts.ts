import { Contract, ContractStatus, Profile, ProfileTypes } from '@/model';
import { Op } from 'sequelize';

export async function findAllContracts(profileId: number) {
  return Contract.findAll({
    where: {
      status: {
        [Op.ne]: ContractStatus.TERMINATED
      },
      [Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId }
      ]
    }
  })
}

export async function findContractById(contractId: string, profileId: number) {
  return Contract.findOne({
    where: {
      id: contractId,
      ClientId: profileId
    }
  });
}

export async function findContractorById(id: number) {
  return Profile.findOne({
    where: { id, type: ProfileTypes.CONTRACTOR },
  });
}
