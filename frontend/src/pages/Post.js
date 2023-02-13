import React from "react";
import { useParams } from "react-router-dom";
import PostDetails from "../components/posts/PostDetails";
import useGetPost from "../hooks/useGetPost";
function Post() {
  const { id } = useParams();
  const { data, loading, error } = useGetPost(id);
  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error || data.message) {
    content = <div>Error...</div>;
  } else if (!loading & !error) {
    content = <PostDetails post={data} />;
  }

  return content;
}

export default Post;
