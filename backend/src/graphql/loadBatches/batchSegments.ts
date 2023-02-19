import { pool } from "../../helpers/db";
import { GET_SEGMENTS_BY_IDS } from "../../queries/segmentQueries";
const batchSegments = async (ids: readonly string[]) => {  
  const { rows } = await pool.query(GET_SEGMENTS_BY_IDS, [ids]);
  const segmentMap = {};
  for (let i = 0; i < rows.length; i += 1) {
    segmentMap[rows[i].id] = rows[i];
  }
  return ids.map((id) => segmentMap[id]);
};

export default batchSegments;
