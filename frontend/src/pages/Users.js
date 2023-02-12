import React from "react";
import UserCard from "../components/users/UserCard";
function Users() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* testing purpose */}
      <UserCard user={{ segment: "Customer", color: "red" }} />
      <UserCard user={{ segment: "Lead", color: "blue" }} />
      <UserCard user={{ segment: "Prospect", color: "green" }} />
      <UserCard user={{ segment: "Prospect", color: "green" }} />
      <UserCard user={{ segment: "Prospect", color: "green" }} />
      <UserCard user={{ segment: "Prospect", color: "green" }} />
      <UserCard user={{ segment: "Prospect", color: "green" }} />
      <UserCard user={{ segment: "Prospect", color: "green" }} />

    </div>
  );
}

export default Users;
