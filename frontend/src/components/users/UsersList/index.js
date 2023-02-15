import { useMutation } from "@apollo/client";
import React from "react";
import { UpdateUserSegmentMutation } from "../../../graphql/mutations/UpdateUserSegment";
import UserCard from "../UserCard";

function UsersList({ users }) {
  const [mutate] = useMutation(UpdateUserSegmentMutation);
  const handleSegmentChange = ({ segmentName, id }) => {
    if (!segmentName) return;
    mutate({
      variables: {
        segmentName,
        id,
      },
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {users.map((user) => {
          return (
            <UserCard
              onSegmentChange={handleSegmentChange}
              key={user.id}
              user={user}
            />
          );
        })}
      </div>
    </>
  );
}

export default UsersList;
