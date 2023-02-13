import React, { useState } from "react";
import CreatePostModal from "../components/posts/CreatePostModal";
import PostCard from "../components/posts/PostCard";
import useGetPosts from "../hooks/useGetPosts";

function Post() {
  const { data, loading, error } = useGetPosts();
  const [modalOpen, setModalOpen] = useState(false);

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error || data.message) {
    content = <div>Error...</div>;
  } else if (!loading & !error) {
    content = (
      <>
        <div
          style={{
            width: "50%",
          }}
        >
          {" "}
          <CreatePostModal
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
          />
        </div>

        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Create Post
        </button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {data.posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
      </>
    );
  }
  return content;
}

export default Post;
