import { ApolloClient, InMemoryCache } from "@apollo/client";
import { REACT_APP_API_URL } from "../../constants/env";

export const client = new ApolloClient({
  uri: REACT_APP_API_URL,
  cache: new InMemoryCache(),
});
