export const CREATE_POST: string = `INSERT INTO post (title, subtitle, text, assigned_to) VALUES ($1, $2, $3, $4) RETURNING *`;
export const UPDATE_POST: string = `UPDATE post SET title = $1, subtitle = $2, text = $3 WHERE id = $4 RETURNING *`;
export const DELETE_POST: string = `DELETE FROM post WHERE id = $1 RETURNING *`;
// ----

export const GET_POSTS: string = `SELECT * FROM post`;
