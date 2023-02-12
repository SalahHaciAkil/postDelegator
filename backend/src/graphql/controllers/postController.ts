import { pool } from "../../helpers/db";
import {
  CREATE_POST,
  DELETE_POST,
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

export const processPendingPosts = async () => {
  const pendingPosts = await pool.query(
    "SELECT * FROM post WHERE sent = false"
  );
  const postsToProcess = pendingPosts.rows;
  for (const post of postsToProcess) {
    // Check if post is assigned to persons
    if (post.assigned_to === 1) {
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
    } else if (post.assigned_to === 2) {
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
