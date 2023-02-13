import Post from "../pages/Post";
import Posts from "../pages/Posts";
import Users from "../pages/Users";

export const ROUTES = [
  { path: "/", name: "Users", exact: true, element: Users },
  { path: "/posts", name: "Posts", exact: true, element: Posts },
  { path: "/post/:id", name: "PostDetails", exact: true, element: Post },
];
