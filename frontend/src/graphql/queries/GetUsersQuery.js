import { gql } from "@apollo/client";

export const GetUsersQuery = gql`
  query getUsers {
    result: persons {
      ... on ListOfPersons {
        persons {
          email
          id
          name
          segment {
            color
            id
            name
          }
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
