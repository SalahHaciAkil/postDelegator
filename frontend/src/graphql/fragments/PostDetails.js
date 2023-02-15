import { gql } from "@apollo/client";

export const PostDetailsFragment = gql`
  fragment PostDetails on Post {
    id
    title
    subtitle
    text
    sent
    assigned_to
  }
`;
