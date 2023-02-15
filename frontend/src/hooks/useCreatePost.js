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
          cache.writeQuery({
            query: GetPostQuery,
            variables: { id: data.result.id },
            data: {
              result: data.result,
            },
          });
        },
      });

      return result;
    },
    loading,
    error: Boolean(error),
  };
}

export default useCreatePost;
