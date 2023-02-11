import { gql } from "apollo-server-express";

const ResponseType = gql`
  """
  This is the response sent back after a request.
  """
  type Response {
    message: String!
    status: Int!
    success: Boolean!
  }
`;
export default ResponseType;
