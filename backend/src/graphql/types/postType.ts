import { gql } from "apollo-server-express";

const PostType = gql`
  union PostResponse = Post | Response
  union PostsQueryResponse = ListOfPosts | Response

  # must be an array of non-nulls
  type ListOfPosts {
    posts: [Post!]!
  }

  enum ASSIGN_TYPE {
    PERSON
    SEGMENT
  }

  type Post {
    id: ID!
    title: String!
    subtitle: String!
    text: String!
    sent: Boolean!
    assigned_to: ASSIGN_TYPE
  }

  #   create Post input
  input CreatePostInput {
    title: String!
    subtitle: String!
    text: String!
    assigned_to: ASSIGN_TYPE
  }

  #   update post input
  input UpdatePostInput {
    title: String
    subtitle: String
    text: String
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    createPost(input: CreatePostInput!): PostResponse
    deletePost(id: ID!): PostResponse
    updatePost(id: ID!, input: UpdatePostInput!): PostResponse
  }
`;

export default PostType;
