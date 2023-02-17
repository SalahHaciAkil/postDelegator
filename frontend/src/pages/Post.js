import React from "react";
import { useLocation, useParams } from "react-router-dom";
import PostDetails from "../components/posts/PostDetails";
import useGetPost from "../hooks/useGetPost";
import useSchedulePostToPersons from "../hooks/useSchedulePostToPersons";
import useSchedulePostToSegments from "../hooks/useSchedulePostToSegments";
function Post() {
  const { id } = useParams();
  const location = useLocation();
  const selectedUsers = location?.state?.selectedUsers;
  const { schedulePost: schedulePostToPersons } = useSchedulePostToPersons();
  const { schedulePost: schedulePostToSegments } = useSchedulePostToSegments();

  const { data, loading, error } = useGetPost(id);
  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error || data.message) {
    content = <div>Error...{data.message ? data.message : ""}</div>;
  } else if (!loading & !error) {
    content = (
      <PostDetails
        selectedUsers={selectedUsers}
        schedulePostToPersons={schedulePostToPersons}
        schedulePostToSegments={schedulePostToSegments}
        post={data}
      />
    );
  }

  return content;
}

export default Post;
