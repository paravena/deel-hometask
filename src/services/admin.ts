import { sequelize } from '../model';

function getBestProfessionRawQuery(startDate: string, endDate: string) {
  return `SELECT
    profession,
    MAX(total) AS total
  FROM (
    SELECT
      profile.profession AS profession,
      SUM(job.price) AS total
    FROM Jobs AS job
      JOIN Contracts AS contract
        ON contract.id = job.ContractId
      JOIN Profiles AS profile
        ON contract.ContractorId = profile.id
    WHERE job.paid IS NOT NULL
    AND job.paymentDate BETWEEN '${startDate}' AND '${endDate}'
    GROUP BY profile.profession)`
}
export async function getBestProfession(start: string, end: string) {
  const query = getBestProfessionRawQuery(start, end)
  const result = await sequelize.query(query);
  if (result && result.length > 0) {
    return result[0][0]
  }
  return {};
}

function getBestClientsRawQuery(startDate:string, endDate:string, limit:number) {
  return `SELECT
    profile.id AS id,
    profile.firstName || ' ' || profile.lastName AS fullName,
    SUM(job.price) AS paid
  FROM Jobs AS job
    JOIN Contracts AS contract
      ON contract.id = job.ContractId
    JOIN Profiles AS profile
      ON contract.ClientId = profile.id
  WHERE job.paid IS NOT NULL
    AND job.paymentDate BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY fullName
  ORDER BY paid DESC
  LIMIT ${limit};
  )`;
}
export async function getBestClients(start: string, end: string, limit: number) {
  const query = getBestClientsRawQuery(start, end, limit);
  return sequelize.query(query);
}
