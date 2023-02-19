import { pool } from "../../helpers/db";
import { GET_PERSONS_BY_IDS } from "../../queries/personQueries";
const batchPersons = async (ids: readonly string[]) => {
  const { rows } = await pool.query(GET_PERSONS_BY_IDS, [ids]);
  const personMap = {};
  for (let i = 0; i < rows.length; i += 1) {
    personMap[rows[i].id] = rows[i];
  }
  return ids.map((id) => personMap[id]);
};

export default batchPersons;
