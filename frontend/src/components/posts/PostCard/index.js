import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.scss";

const PostCard = ({ post }) => (
  <div className={styles["post-card"]}>
    <div className={styles["header"]}>
      <h3 className={styles["title"]}>{post.title}</h3>
      <p className={styles["subtitle"]}>{post.subtitle}</p>
    </div>
    <Link to={`/post/${post.id}`} className={styles["details-link"]}>
      Details
    </Link>
  </div>
);

export default PostCard;
