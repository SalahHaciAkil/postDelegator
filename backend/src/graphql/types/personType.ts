import { gql } from "apollo-server-express";

const PersonType = gql`
  union PersonResponse = Person | Response
  type Person {
    id: ID!
    email: String!
    name: String!
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
    hello: String
  }
  type Mutation {
    createPerson(input: CreatePersonInput!): PersonResponse
    deletePerson(id: ID!): PersonResponse
    updatePerson(id: ID!, input: UpdatePersonInput!): PersonResponse
  }
`;

export default PersonType;
