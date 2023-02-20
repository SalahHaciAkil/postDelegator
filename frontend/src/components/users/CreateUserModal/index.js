import React from "react";
import FormInput from "../../FormInput/FormInput.js";
import Modal from "../../Modal/index.js";
import ModalButton from "../../Modal/ModalButton";
import styles from "../../Modal/Modal.module.scss";
import { SEGMENTS } from "../../../constants/index.js";

function CreateUserModal({
  width,
  isOpen,
  handleClose,
  handleUserSave,
  isCreateLoading,
}) {
  const [userInput, setUserInput] = React.useState({
    name: "",
    email: "",
    segmentName: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setUserInput({
      name: "",
      email: "",
      segmentName: "",
    });
  };

  const isValidInputs = (userInput) => {
    return userInput.name && userInput.email && userInput.segmentName;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInputs(userInput)) return alert("Please fill all the fields");
    await handleUserSave(userInput);
    resetForm();
    handleClose();
  };
  return (
    <div
      style={{
        width: width ? width : "100%",
      }}
    >
      <Modal isOpen={isOpen}>
        <h1>Create a new user</h1>
        <form onSubmit={onSubmit}>
          <FormInput
            placeholder="Name"
            value={userInput.name}
            autoFocus
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />
          <FormInput
            onChange={handleInputChange}
            value={userInput.email}
            placeholder="Email"
            type="email"
            name="email"
            id="email"
          />
          <select
            value={userInput.segmentName}
            onChange={handleInputChange}
            name="segmentName"
            id="segmentName"
          >
            <option defaultValue={userInput.segmentName}>
              Select a segment
            </option>
            {SEGMENTS.map((segment) => (
              <>
                <option key={segment.value} value={segment.value}>
                  {segment.label}
                </option>
              </>
            ))}
          </select>{" "}
          <div className={styles.btns}>
            <ModalButton
              type="button"
              onClick={() => {
                resetForm();
                handleClose();
              }}
            >
              Cancel
            </ModalButton>
            <ModalButton disabled={isCreateLoading}>
              {isCreateLoading ? "Saving..." : "Save"}
            </ModalButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CreateUserModal;
