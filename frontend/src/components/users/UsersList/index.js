import { useMutation } from "@apollo/client";
import React from "react";
import { UpdateUserSegmentMutation } from "../../../graphql/mutations/UpdateUserSegment";
import UserCard from "../UserCard";
import useGetUrlQuery from "../../../hooks/useGetUrlQuery";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
function UsersList({ users }) {
  const urlUsersIds = useGetUrlQuery("selectedUsers");
  const isSelect = useGetUrlQuery("isSelect");
  const postId = useGetUrlQuery("postId");
  const selectedUrlUsers = urlUsersIds ? urlUsersIds.split(",") : [];

  const [selectedUsers, setSelectedUsers] = React.useState([
    ...selectedUrlUsers,
  ]);

  const navigate = useNavigate();

  const onUserSelect = (id) => {
    if (!isSelect) return;
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {users.map((user) => {
          return (
            <UserCard
              selectable={isSelect === "true"}
              onUserSelect={onUserSelect}
              selectedUsers={selectedUsers}
              onSegmentChange={handleSegmentChange}
              key={user.id}
              user={user}
            />
          );
        })}
      </div>

      {isSelect && (
        <>
          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              zIndex: 1000,
              width: "200px",
            }}
          >
            <Button
              onClick={() => {
                navigate(`/post/${postId}`, { state: { selectedUsers } });
              }}
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default UsersList;
