import { gql } from "apollo-server-express";

const SegmentType = gql`
  type Segment {
    id: ID!
    name: String!
    color: String!
  }
`;

export default SegmentType;
