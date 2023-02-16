import React from "react";
import PostCard from '../PostCard'
function PostsList({posts}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}

export default PostsList;
