import { gql } from "apollo-server-express";

const PersonType = gql`
  union PersonResponse = Person | Response
  union PersonsQueryResponse = ListOfPersons | Response

  # must be an array of non-nulls
  type ListOfPersons {
    persons: [Person!]!
  }

  type Person {
    id: ID!
    email: String!
    name: String!
    segment: Segment!
  }

  #   create person input
  input CreatePersonInput {
    email: String!
    name: String!
    segmentName: SEGMENT_NAMES!
  }

  #   update person input
  input UpdatePersonInput {
    email: String
    name: String
    segmentId: ID
  }

  type Query {
    persons: PersonsQueryResponse
  }
  type Mutation {
    createPerson(input: CreatePersonInput!): PersonResponse
    deletePerson(id: ID!): PersonResponse
    updatePerson(id: ID!, input: UpdatePersonInput!): PersonResponse
    updatePersonSegment(id: ID!, segmentName: SEGMENT_NAMES!): PersonResponse
  }
`;

export default PersonType;
