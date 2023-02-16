import React, { useState } from "react";
import CreatePostModal from "../components/posts/CreatePostModal";
import useGetPosts from "../hooks/useGetPosts";
import useCreatePost from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
import PostsList from "../components/posts/PostsList";
import Button from "../components/Button";
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

        <div
          style={{
            display: modalOpen ? "none" : "block",
            position: "fixed",
            bottom: "1rem",
            right: "calc(50% - 100px)",
            zIndex: 1000,
            width: "200px",
          }}
        >
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create Post
          </Button>
        </div>

        <PostsList posts={data.posts} />
      </>
    );
  }
  return content;
}

export default Post;
