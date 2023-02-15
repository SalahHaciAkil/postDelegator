import { gql } from "@apollo/client";
import { PostDetailsFragment } from "../fragments/PostDetails";

export const GetPostsQuery = gql`
  query getPosts {
    result: posts {
      ... on ListOfPosts {
        posts {
          ...PostDetails
        }
      }
      ... on Response {
        message
        status
        success
      }
    }
  }
  ${PostDetailsFragment}
`;
