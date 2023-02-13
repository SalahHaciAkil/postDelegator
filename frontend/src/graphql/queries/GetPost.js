import { gql } from "@apollo/client";

export const GetPostQuery = gql`
  query getPost($id: ID!) {
   result:post(id: $id) {
      ... on Post {
        id
        title
        subtitle
        text
        sent
        assigned_to
      }
      ... on Response {
        message
        status
        success
      }
    }
  }
`;
