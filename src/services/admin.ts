import { Job, sequelize } from '../model';
import { col, fn, literal } from 'sequelize';

function getRawQuery(startDate: string, endDate: string) {
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
  const query = getRawQuery(start, end)
  const result = await sequelize.query(query);
  if (result && result.length > 0) {
    return result[0][0]
  }
  return {};
}
