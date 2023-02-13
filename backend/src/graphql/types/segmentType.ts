import { gql } from "apollo-server-express";

const SegmentType = gql`
  enum SEGMENT_NAMES {
    lead
    customer
    prospect
  }

  type Segment {
    id: ID!
    name: String!
    color: String!
    persons: [Person]
  }
`;

export default SegmentType;
