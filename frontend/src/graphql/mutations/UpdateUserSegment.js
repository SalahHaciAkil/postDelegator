import { gql } from "@apollo/client";

export const UpdateUserSegmentMutation = gql`
  mutation UpdatePersonSegment($id: ID!, $segmentName: SEGMENT_NAMES!) {
    result: updatePersonSegment(id: $id, segmentName: $segmentName) {
      ... on Person {
        id
        email
        name
        segment {
          id
          name
          color
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
