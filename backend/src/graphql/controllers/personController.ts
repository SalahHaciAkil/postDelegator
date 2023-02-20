import { STATUS_CODES } from "./../../helpers/constants";
import { pool } from "../../helpers/db";
import { raiseError } from "../../helpers/errorHandlers";
import {
  CREATE_PERSON,
  DELETE_PERSON,
  GET_PERSONS,
  UPDATE_PERSON,
  UPDATE_PERSON_SEGMENT,
  GET_PERSON_BY_EMAIL,
} from "../../queries/personQueries";
import { GET_SEGMENT_BY_NAME } from "../../queries/segmentQueries";
import logger from "../../config/winston";

export const getPersons = async () => {
  const { rows } = await pool.query(GET_PERSONS);
  return { persons: rows };
};

// ----

export const createPerson = async (_: any, { input }) => {
  const { name, email, segmentName } = input;
  const { rows: usersByEmailRows } = await pool.query(GET_PERSON_BY_EMAIL, [
    email,
  ]);
  if (usersByEmailRows.length) {
    return raiseError({
      message: "User with this email already exists",
      status: STATUS_CODES.BAD_REQUEST,
      success: false,
    });
  }
  const { rows: segmentsRows } = await pool.query(GET_SEGMENT_BY_NAME, [
    segmentName,
  ]);

  if (!segmentsRows.length) {
    return raiseError({
      message: "Segment not found",
      status: STATUS_CODES.NOT_FOUND,
      success: false,
    });
  }
  const { rows } = await pool.query(CREATE_PERSON, [
    name,
    email,
    segmentsRows[0].id,
  ]);
  logger.info(`Created person with id: ${rows[0].id} and email: ${email}`);
  return rows[0];
};

export const updatePerson = async (_: any, { input, id }) => {
  const { name, email } = input;
  const { rows } = await pool.query(UPDATE_PERSON, [name, email, id]);
  return rows[0];
};

export const updatePersonSegment = async (_: any, { segmentName, id }) => {
  const { rows: rowsResult } = await pool.query(GET_SEGMENT_BY_NAME, [
    segmentName,
  ]);
  const segmentId = rowsResult[0].id;
  const { rows } = await pool.query(UPDATE_PERSON_SEGMENT, [segmentId, id]);
  return rows[0];
};

export const deletePerson = async (_: any, { id }) => {
  const { rows } = await pool.query(DELETE_PERSON, [id]);
  return rows[0];
};
