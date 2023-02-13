import { pool } from "../../helpers/db";
import { GET_SEGMENT_BY_ID } from "../../queries/segmentQueries";

export const getSegmentById = async (_: any, { id }: any) => {
  const { rows } = await pool.query(GET_SEGMENT_BY_ID, [id]);
  return rows[0];
};

export const getSegmentBySegmentId = async (parent: any, _: any) => {
  const { segment_id } = parent;
  return await getSegmentById(null, { id: segment_id });
};

export const getPersons = async (parent: any, _: any) => {
  const { id } = parent;
  const { rows } = await pool.query(
    "SELECT person.* FROM person WHERE segment_id = $1",
    [id]
  );
  return rows;
};
