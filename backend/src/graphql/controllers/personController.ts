import { pool } from "../../helpers/db";
import {
  CREATE_PERSON,
  DELETE_PERSON,
  GET_PERSONS,
  UPDATE_PERSON,
} from "../../queries/personQueries";

export const getPersons = async () => {
  const { rows } = await pool.query(GET_PERSONS);
  return { persons: rows };
};

// ----

export const createPerson = async (_: any, { input }) => {
  const { name, email, segmentId } = input;
  const { rows } = await pool.query(CREATE_PERSON, [name, email, segmentId]);
  return rows[0];
};

export const updatePerson = async (_: any, { input, id }) => {
  const { name, email } = input;
  const { rows } = await pool.query(UPDATE_PERSON, [name, email, id]);
  return rows[0];
};

export const deletePerson = async (_: any, { id }) => {
  const { rows } = await pool.query(DELETE_PERSON, [id]);
  return rows[0];
};
