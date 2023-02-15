import { gql } from "@apollo/client";
import { PostDetailsFragment } from "../fragments/PostDetails";

export const CreatePostMutation = gql`
  mutation CreatePost($input: CreatePostInput!) {
    result: createPost(input: $input) {
      ... on Post {
        ...PostDetails
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
