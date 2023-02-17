import React, { useState } from "react";
import CreateUserButton from "../components/users/CreateUserButton";
import CreateUserModal from "../components/users/CreateUserModal";
import UsersList from "../components/users/UsersList";
import useCreateUser from "../hooks/useCreateUser";
import useGetUrlQuery from "../hooks/useGetUrlQuery";
import useGetUsers from "../hooks/useGetUsers";
function Users() {
  const { data, loading, error } = useGetUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const { createUser, loading: isCreateLoading } = useCreateUser();
  const isSelect = useGetUrlQuery("isSelect");

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error || data.message) {
    content = <div>Error...</div>;
  } else if (!loading & !error) {
    content = (
      <>
        {!isSelect && (
          <>
            {" "}
            <CreateUserModal
              width="50%"
              isCreateLoading={isCreateLoading}
              isOpen={modalOpen}
              handleClose={() => setModalOpen(false)}
              handleUserSave={async (userInput) => {
                createUser(userInput);
              }}
            />
            <CreateUserButton
              hidden={modalOpen}
              onClick={() => setModalOpen(true)}
            >
              Create User
            </CreateUserButton>
          </>
        )}
        <UsersList users={data.persons} />
      </>
    );
  }

  return content;
}

export default Users;
