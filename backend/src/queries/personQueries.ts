export const CREATE_PERSON: string = `INSERT INTO person (name, email,segment_id) VALUES ($1, $2,$3) RETURNING *`;
export const UPDATE_PERSON: string = `UPDATE person SET name = $1, email = $2 WHERE id = $3 RETURNING *`;
export const DELETE_PERSON: string = `DELETE FROM person WHERE id = $1 RETURNING *`;
export const UPDATE_PERSON_SEGMENT: string = `UPDATE person SET segment_id = $1 WHERE id = $2 RETURNING *`;
// ----
export const GET_PERSONS: string = `SELECT * FROM person`;
export const GET_PERSON_BY_EMAIL: string = `SELECT * FROM person WHERE email = $1`;
