import { handleUncaughtError } from "../../helpers/errorHandlers";
import controllers from "../controllers";

const { postController } = controllers;
export default {
  Query: {
    posts: handleUncaughtError(postController.getPosts),
    post: handleUncaughtError(postController.getPost),
  },
  Mutation: {
    createPost: handleUncaughtError(postController.createPost),
    deletePost: handleUncaughtError(postController.deletePost),
    updatePost: handleUncaughtError(postController.updatePost),
    schedulePostToSegments: handleUncaughtError(postController.schedulePostToSegments),
    schedulePostToPersons: handleUncaughtError(postController.schedulePostToPersons),
  },
  PostResponse: {
    __resolveType(obj: any) {
      if (obj.id) {
        return "Post";
      }
      if (obj.message) {
        return "Response";
      }
      return null;
    },
  },

  PostsQueryResponse: {
    __resolveType(obj: any) {
      if (obj.posts) {
        return "ListOfPosts";
      }
      if (obj.message) {
        return "Response";
      }
      return null;
    },
  },

  ASSIGN_TYPE: {
    PERSON: 1,
    SEGMENT: 2,
  },
};
