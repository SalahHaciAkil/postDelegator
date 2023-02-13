import { useQuery } from "@apollo/client";
import { GetPostsQuery } from "../graphql/queries/GetPosts";

function useGetPosts() {
  const { data, loading, error } = useQuery(GetPostsQuery);

  return { data: data?.result, loading, error: Boolean(error) };
}

export default useGetPosts;
