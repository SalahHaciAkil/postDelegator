import { gql } from "@apollo/client";

export const PostDetailsFragment = gql`
  fragment PostDetails on Post {
    scheduled_to
    id
    sent
    subtitle
    text
    title
    scheduledPersons {
      email
      id
      name
      segment {
        color
        id
        name
      }
    }
    scheduledSegments {
      color
      name
      id
    }
  }
`;
