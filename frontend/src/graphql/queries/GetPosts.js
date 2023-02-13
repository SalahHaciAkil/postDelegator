import { gql } from "@apollo/client";

export const GetPostsQuery = gql`
  query getPosts {
    result: posts {
      ... on ListOfPosts {
        posts {
          id
          sent
          subtitle
          text
          title
          assigned_to
        }
      }
      ... on Response {
        message
        status
        success
      }
    }
  }
`;
