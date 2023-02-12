import { pool } from "../../helpers/db";
import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  UPDATE_POST,
} from "../../queries/postQueries";

export const createPost = async (_: any, { input }) => {
  const { title, subtitle, text, assigned_to } = input;
  const { rows } = await pool.query(CREATE_POST, [
    title,
    subtitle,
    text,
    assigned_to,
  ]);

  return rows[0];
};

export const updatePost = async (_: any, { input, id }) => {
  const { title, subtitle, text } = input;
  const { rows } = await pool.query(UPDATE_POST, [title, subtitle, text, id]);
  return rows[0];
};

export const deletePost = async (_: any, { id }) => {
  const { rows } = await pool.query(DELETE_POST, [id]);
  return rows[0];
};

export const getPosts = async () => {
  const { rows } = await pool.query(GET_POSTS);
  return { posts: rows };
};
