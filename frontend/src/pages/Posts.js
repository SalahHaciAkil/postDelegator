import React, { useState } from "react";
import CreatePostModal from "../components/posts/CreatePostModal";
import PostCard from "../components/posts/PostCard";
import useGetPosts from "../hooks/useGetPosts";
import useCreatePost from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
function Post() {
  const { data, loading, error } = useGetPosts();
  const [modalOpen, setModalOpen] = useState(false);
  const { createPost, loading: isCreateLoading } = useCreatePost();
  const navigate = useNavigate();

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error || data.message) {
    content = <div>Error...</div>;
  } else if (!loading & !error) {
    content = (
      <>
        <CreatePostModal
          width="50%"
          isCreateLoading={isCreateLoading}
          isOpen={modalOpen}
          handleClose={() => setModalOpen(false)}
          handlePostSave={async (postInput) => {
            const post = await createPost(postInput);
            navigate(`/post/${post.id}`);
          }}
        />

        {/* TODO: create style for this button */}
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
