import { useMutation } from "@apollo/client";
import { CreatePostMutation } from "../graphql/mutations/CreatePost";
import { GetPostQuery } from "../graphql/queries/GetPost";
function useCreatePost() {
  const [mutate, { loading, error }] = useMutation(CreatePostMutation);

  return {
    createPost: async (input) => {
      const {
        data: { result },
      } = await mutate({
        variables: { input },
        update: (cache, { data }) => {
          // check if the result is of type Response or Post
          if (data.result.message) return;
          cache.writeQuery({
            query: GetPostQuery,
            variables: { id: data.result.id },
            data: {
              result: data.result,
            },
          });
        },
      });

      if (result.message) alert(result.message);
      if (result.id) alert("post created successfully");
      return result;
    },
    loading,
    error: Boolean(error),
  };
}

export default useCreatePost;
