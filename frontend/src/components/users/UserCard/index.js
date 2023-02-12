import React from "react";
import styles from "./UserCard.module.scss";
import defaultProfileImage from "../../../assets/images/profile.png";
import { SEGMENTS, SEGMENTS_COLOR } from "../../../constants/index.js";
function UserCard({ user: { color, segment } }) {
  return (
    <div className={styles.userCard}>
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${defaultProfileImage})`,
        }}
      ></div>
      <div className={styles.info}>
        <p className={styles.name}>salah haciakil</p>
        <p className={styles.email}>example@gmail.com</p>
        <p
          className={styles["segment-circle"]}
          style={{
            backgroundColor: SEGMENTS_COLOR[color],
          }}
        />
        <p className={styles.segment}>{segment}</p>
        <select name="segments" id="segments">
          {SEGMENTS.map((segment) => (
            <option value={segment.value}>{segment.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserCard;
