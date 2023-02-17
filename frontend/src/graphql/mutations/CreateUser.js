import { gql } from "@apollo/client";
export const CreateUserMutation = gql`
  mutation CreatePerson($input: CreatePersonInput!) {
    result: createPerson(input: $input) {
      ... on Person {
        id
        email
        name
        segment {
          color
          id
          name
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
