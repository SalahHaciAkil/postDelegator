import React from "react";
import UsersList from "../components/users/UsersList";
import useGetUsers from "../hooks/useGetUsers";
function Users() {
  const { data, loading, error } = useGetUsers();

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error || data.message) {
    content = <div>Error...</div>;
  } else if (!loading & !error) {
    content = <UsersList users={data.persons} />;
  }

  return content;
}

export default Users;
