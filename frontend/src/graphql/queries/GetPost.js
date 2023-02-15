import { gql } from "@apollo/client";
import { PostDetailsFragment } from "../fragments/PostDetails";

export const GetPostQuery = gql`
  query getPost($id: ID!) {
    result: post(id: $id) {
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
