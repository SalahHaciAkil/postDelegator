import { useQuery } from "@apollo/client";
import { GetPostQuery } from "../graphql/queries/GetPost";

function useGetPost(id) {
  const { data, loading, error } = useQuery(GetPostQuery, {
    variables: { id },
  });

  return { data: data?.result, loading, error: Boolean(error) };
}

export default useGetPost;
