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
    segment_id: String!
    segment: Segment!
  }

  #   create person input
  input CreatePersonInput {
    email: String!
    name: String!
    segmentId: ID!
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
  }
`;

export default PersonType;
