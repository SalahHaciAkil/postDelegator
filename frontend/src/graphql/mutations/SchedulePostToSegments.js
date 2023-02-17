import { gql } from "@apollo/client";
import { PostDetailsFragment } from "../fragments/PostDetails";

export const SchedulePostToSegmentsMutation = gql`
  mutation SchedulePostToSegments($id: ID!, $segmentNames: [SEGMENT_NAMES!]!) {
    result: schedulePostToSegments(id: $id, segmentNames: $segmentNames) {
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
