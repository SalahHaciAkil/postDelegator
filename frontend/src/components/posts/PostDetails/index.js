import React from "react";
import { useNavigate } from "react-router-dom";
import { POST_SCHEDULING_TYPE, SEGMENTS } from "../../../constants";
import Button from "../../Button";
import styles from "./PostDetails.module.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
function PostDetails({
  schedulePostToPersons,
  schedulePostToSegments,
  post,
  selectedUsers = [],
}) {
  const [isSegmentSelect, setIsSegmentSelect] = React.useState(false);
  const [selectedSegments, setSelectedSegments] = React.useState([]);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles["post-wrapper"]}>
        <h1 className={styles["title"]}>{post.title}</h1>
        <h2 className={styles["subtitle"]}>{post.subtitle}</h2>
        <p className={styles["text"]}>{post.text}</p>
      </div>
      <div className={styles["post-wrapper"]}>
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
                "Schedule Post: "
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
                schedule to selected users
              </Button>
            </>
          )}

          {selectedSegments.length > 0 && !post.scheduled_to && (
            <>
              <Button
                width={"30%"}
                onClick={() => {
                  schedulePostToSegments({
                    id: post.id,
                    segmentNames: selectedSegments.map(
                      (segment) => segment.value
                    ),
                  });
                }}
              >
                schedule to selected segments
              </Button>
            </>
          )}

          {!isSegmentSelect && (
            <>
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
            </>
          )}

          {selectedUsers.length === 0 && (
            <>
              <Button
                width={"30%"}
                hidden={post.scheduled_to}
                onClick={() => {
                  setIsSegmentSelect((prev) => !prev);
                  setSelectedSegments([]);
                }}
              >
                {!isSegmentSelect ? "To Segments" : "Cancel segments selection"}
              </Button>
            </>
          )}
        </div>

        {isSegmentSelect && !post.scheduled_to && (
          <div
            style={{
              marginTop: "1rem",
              width: "30%",
            }}
          >
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={(selectedSegments) => {
                setSelectedSegments(selectedSegments);
              }}
              name="colors"
              options={SEGMENTS}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetails;
