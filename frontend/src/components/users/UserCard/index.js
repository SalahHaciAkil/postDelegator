import React from "react";
import styles from "./UserCard.module.scss";
import defaultProfileImage from "../../../assets/images/profile.png";
import { SEGMENTS } from "../../../constants/index.js";
function UserCard({
  user,
  onSegmentChange,
  onUserSelect,
  selectedUsers = [],
  selectable,
}) {
  return (
    <div
      onClick={() => onUserSelect(user.id)}
      className={`${styles.userCard} ${selectable ? styles.selectable : ""}  ${
        selectedUsers.includes(user.id) ? styles.selected : ""
      }`}
    >
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${defaultProfileImage})`,
        }}
      ></div>
      <div className={styles.info}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.email}>{user.email}</p>
        <p
          className={styles["segment-circle"]}
          style={{
            backgroundColor: user.segment.color,
          }}
        />
        <p className={styles.segment}>{user.segment.name}</p>
        <select
          disabled={selectable}
          name="segments"
          id="segments"
          defaultValue={user.segment.name}
          onChange={({ target: { value } }) => {
            onSegmentChange({
              segmentName: value,
              id: user.id,
            });
          }}
        >
          {SEGMENTS.map((segment) => (
            <option key={segment.label} value={segment.value}>
              {segment.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserCard;
