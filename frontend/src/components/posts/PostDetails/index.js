import React from "react";
import { useNavigate } from "react-router-dom";
import { POST_SCHEDULING_TYPE } from "../../../constants";
import Button from "../../Button";
import styles from "./PostDetails.module.scss";

function PostDetails({ schedulePostToPersons, post, selectedUsers = [] }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles["post-detail-page"]}>
        <h1 className={styles["title"]}>{post.title}</h1>
        <h2 className={styles["subtitle"]}>{post.subtitle}</h2>
        <p className={styles["text"]}>{post.text}</p>
      </div>
      <div className={styles["post-detail-page"]}>
        <div>
          {post.scheduled_to ? (
            <>
              <h3 className={styles["schedule-title"]}>
                Post is already{" "}
                {post.sent ? (
                  <span style={{ color: "#3778ff" }}>sent</span>
                ) : (
                  <span style={{ color: "#d8dd30" }}>scheduled</span>
                )}{" "}
                to the following{" "}
                {post.scheduled_to === POST_SCHEDULING_TYPE.PERSON
                  ? "users"
                  : "segments"}
                :
              </h3>
              <ul>
                {post.scheduled_to === POST_SCHEDULING_TYPE.PERSON
                  ? post.scheduledPersons.map((person) => (
                      <li
                        style={{
                          color: person.segment.color,
                        }}
                        key={person.id}
                      >
                        {person.name}
                      </li>
                    ))
                  : post.scheduledSegments.map((segment) => (
                      <li style={{ color: segment.color }} key={segment.id}>
                        {segment.name}
                      </li>
                    ))}
              </ul>
            </>
          ) : (
            <p>
              {selectedUsers.length > 0 ? (
                <>
                  You have selected{" "}
                  <span style={{ color: "red" }}>{selectedUsers.length}</span>{" "}
                  users, you can go back and edit your selection
                </>
              ) : (
                <h2>Schedule Post: </h2>
              )}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          {selectedUsers.length > 0 && !post.scheduled_to && (
            <>
              <Button
                width={"30%"}
                onClick={() => {
                  schedulePostToPersons({
                    id: post.id,
                    personIds: selectedUsers,
                  });
                }}
              >
                schedule
              </Button>
            </>
          )}
          <Button
            width={"30%"}
            hidden={post.scheduled_to}
            onClick={() => {
              navigate(
                `/?isSelect=true&postId=${
                  post.id
                }&selectedUsers=${selectedUsers.join(",")}`
              );
            }}
          >
            To Users
          </Button>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
