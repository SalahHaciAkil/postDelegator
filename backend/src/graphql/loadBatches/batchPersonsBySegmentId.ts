import groupBy from "lodash/groupBy";
import { pool } from "../../helpers/db";
import { GET_PERSONS_BY_SEGMENT_IDS } from "../../queries/personQueries";

const batchPersonsBySegmentId = async (ids: readonly string[]) => {
  const { rows } = await pool.query(GET_PERSONS_BY_SEGMENT_IDS, [ids]);
  const personsBySegmentId = groupBy(rows, "segment_id");
  return ids.map((id) => personsBySegmentId[id] || []);
};

export default batchPersonsBySegmentId;
