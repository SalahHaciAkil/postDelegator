import { useMutation } from "@apollo/client";
import { CreateUserMutation } from "../graphql/mutations/CreateUser";
import { GetUsersQuery } from "../graphql/queries/GetUsers";

function useCreateUser() {
  const [mutate, { loading, error }] = useMutation(CreateUserMutation);
  return {
    createUser: async (input) => {
      const {
        data: { result },
      } = await mutate({
        variables: { input },
        update: (cache, { data }) => {
          if (data.result.message) return;
          const {
            result: { persons },
          } = cache.readQuery({
            query: GetUsersQuery,
          });
          cache.writeQuery({
            query: GetUsersQuery,
            data: {
              result: {
                persons: [data.result, ...persons],
                __typename: "ListOfPersons",
              },
            },
          });
        },
      });

      if (result.message) alert(result.message);
      // if (result.id) alert("user created successfully");
      return result;
    },
    loading,
    error: Boolean(error),
  };
}

export default useCreateUser;
