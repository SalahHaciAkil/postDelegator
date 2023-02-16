import { gql } from "@apollo/client";
import { PostDetailsFragment } from "../fragments/PostDetails";

export const SchedulePostToPersonsMutation = gql`
  mutation SchedulePostToPersons($id: ID!, $personIds: [ID!]!) {
    result: schedulePostToPersons(id: $id, personIds: $personIds) {
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
