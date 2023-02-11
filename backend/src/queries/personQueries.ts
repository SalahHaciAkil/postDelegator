export const CREATE_PERSON:string = `INSERT INTO person (name, email,segment_id) VALUES ($1, $2,$3) RETURNING *`;
export const UPDATE_PERSON:string = `UPDATE person SET name = $1, email = $2 WHERE id = $3 RETURNING *`;
export const DELETE_PERSON:string = `DELETE FROM person WHERE id = $1 RETURNING *`;
