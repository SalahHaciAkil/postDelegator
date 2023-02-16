import { gql } from "@apollo/client";

export const GetPostsQuery = gql`
  query getPosts {
    result: posts {
      ... on ListOfPosts {
        posts {
          scheduled_to
          id
          sent
          subtitle
          text
          title
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
