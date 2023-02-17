import { useQuery } from "@apollo/client";
import { GetUsersQuery } from "../graphql/queries/GetUsers";

function useGetUsers() {
  const { data, loading, error } = useQuery(GetUsersQuery);

  return { data: data?.result, loading, error: Boolean(error) };
}

export default useGetUsers;
