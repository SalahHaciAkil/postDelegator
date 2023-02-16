import { POST_ASSIGNMENT_TYPE, STATUS_CODES } from "../../helpers/constants";
import { pool } from "../../helpers/db";
import { raiseError } from "../../helpers/errorHandlers";
import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
} from "../../queries/postQueries";

const sendPendingPosts = (recipients: any, post: any, assignedTo: any) => {
  recipients.forEach((person: any) => {
    console.log(
      `sending post with title ${post.title} to user with email: ${person.email} `
    );
  });

  // Update post table to set sent = true
  pool.query("UPDATE post SET sent = true WHERE id = $1", [post.id]);

  if (assignedTo === "persons") {
    // Update post_person table to set processed = true
    pool.query("UPDATE post_person SET processed = true WHERE post_id = $1", [
      post.id,
    ]);
  } else if (assignedTo === "segments") {
    // Update post_segment table to set processed = true
    pool.query("UPDATE post_segment SET processed = true WHERE post_id = $1", [
      post.id,
    ]);
  }
};

export const createPost = async (_: any, { input }) => {
  const { title, subtitle, text, scheduled_to } = input;
  const { rows } = await pool.query(CREATE_POST, [
    title,
    subtitle,
    text,
    scheduled_to,
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

export const getPost = async (_: any, { id }) => {
  const { rows } = await pool.query(GET_POST, [id]);
  if (!rows[0])
    return raiseError({
      message: "Post not found",
      status: STATUS_CODES.NOT_FOUND,
      success: false,
    });
  return rows[0];
};

export const processPendingPosts = async () => {
  const pendingPosts = await pool.query(
    "SELECT * FROM post WHERE sent = false"
  );
  const postsToProcess = pendingPosts.rows;
  for (const post of postsToProcess) {
    // Check if post is assigned to persons
    if (post.scheduled_to === 1) {
      const recipients = await pool.query(
        `
        SELECT person.email 
        FROM person 
        JOIN post_person ON person.id = post_person.person_id 
        WHERE post_person.post_id = $1 
          AND post_person.processed = false
      `,
        [post.id]
      );

      sendPendingPosts(recipients.rows, post, "persons");

      // Check if post is assigned to segments
    } else if (post.scheduled_to === 2) {
      const segments = await pool.query(
        `
        SELECT segment.id 
        FROM segment 
        JOIN post_segment ON segment.id = post_segment.segment_id 
        WHERE post_segment.post_id = $1 
          AND post_segment.processed = false
      `,
        [post.id]
      );
      for (const segment of segments.rows) {
        // Get all persons from segment
        const recipients = await pool.query(
          `
          SELECT person.email 
          FROM person 
          WHERE person.segment_id = $1
        `,
          [segment.id]
        );

        sendPendingPosts(recipients.rows, post, "segments");
      }
    }
  }
};

export const schedulePostToSegments = async (_: any, { id, segmentNames }) => {
  const { rows } = await pool.query(
    `UPDATE post SET scheduled_to = $1 WHERE id = $2 RETURNING *`,
    [POST_ASSIGNMENT_TYPE.SEGMENT, id]
  );

  // Get all segments from segmentNames
  const segments = await pool.query(
    `
    SELECT * 
    FROM segment 
    WHERE segment.name = ANY($1)
  `,
    [segmentNames]
  );
  // Insert post_id and segment_id into post_segment
  segments.rows.forEach(async (segment: any) => {
    await pool.query(
      `
      INSERT INTO post_segment (post_id, segment_id) 
      VALUES ($1, $2)
    `,
      [id, segment.id]
    );
  });

  return rows[0];
};

export const schedulePostToPersons = async (_: any, { id, personIds }) => {
  // check if the post is already assigned
  const { rows: postRows } = await pool.query(GET_POST, [id]);
  if (!postRows[0]) {
    return raiseError({
      message: "Post not found",
      status: STATUS_CODES.NOT_FOUND,
      success: false,
    });
  }
  if (postRows[0].scheduled_to) {
    return raiseError({
      message: "Post already scheduled",
      status: STATUS_CODES.BAD_REQUEST,
      success: false,
    });
  }

  // check if the persons exist
  const { rows: personRows } = await pool.query(
    `
    SELECT *
    FROM person
    WHERE person.id = ANY($1)
  `,
    [personIds]
  );

  if (personRows.length !== personIds.length) {
    return raiseError({
      message: "Person not found",
      status: STATUS_CODES.NOT_FOUND,
      success: false,
    });
  }

  const { rows } = await pool.query(
    `UPDATE post SET scheduled_to = $1 WHERE id = $2 RETURNING *`,
    [POST_ASSIGNMENT_TYPE.PERSON, id]
  );

  // Insert an entity into post_person table
  personIds.forEach(async (personId: string) => {
    await pool.query(
      `
      INSERT INTO post_person (post_id, person_id)
      VALUES ($1, $2)
    `,
      [id, personId]
    );
  });

  return rows[0];
};

export const getScheduledSegments = async ({ id, scheduled_to }, _: any) => {
  if (scheduled_to !== POST_ASSIGNMENT_TYPE.SEGMENT) return null;
  const { rows } = await pool.query(
    `
    SELECT segment.*
    FROM segment 
    JOIN post_segment ON segment.id = post_segment.segment_id 
    WHERE post_segment.post_id = $1
  `,
    [id]
  );
  return rows;
};

export const getScheduledPersons = async ({ id, scheduled_to }, _: any) => {
  if (scheduled_to !== POST_ASSIGNMENT_TYPE.PERSON) return null;
  const { rows } = await pool.query(
    `
    SELECT person.*
    FROM person 
    JOIN post_person ON person.id = post_person.person_id 
    WHERE post_person.post_id = $1
  `,
    [id]
  );
  return rows;
};
