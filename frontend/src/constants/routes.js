import Posts from "../pages/Posts";
import Users from "../pages/Users";

export const ROUTES = [
  { path: "/", name: "Users", exact: true, element: Users },
  { path: "/posts", name: "Posts", exact: true, element: Posts },
];
