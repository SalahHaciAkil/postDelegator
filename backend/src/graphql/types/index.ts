import { gql } from "apollo-server-express";
import PersonType from "./personType";
import PostType from "./postType";
import ResponseType from "./responseType";

const BaseTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = [BaseTypeDefs, PersonType, PostType, ResponseType];

export default typeDefs;
