export const GET_SEGMENT_BY_ID: string = `SELECT * FROM segment WHERE id = $1`;
export const GET_SEGMENT_BY_NAME: string = `SELECT * FROM segment WHERE name = $1`;
export const GET_SEGMENTS_BY_IDS: string = `SELECT * FROM segment WHERE id = ANY($1::bigint[])`;
