import React from "react";
import FormInput from "../../FormInput/FormInput.js";
import Modal from "../../Modal/index.js";
import Textarea from "../../Textarea/index.js";
import ModalButton from "../../Modal/ModalButton";
import styles from "../../Modal/Modal.module.scss";
function CreatePostModal({
  width,
  isOpen,
  handleClose,
  handlePostSave,
  isCreateLoading,
}) {
  const [postInput, setPostInput] = React.useState({
    title: "",
    subtitle: "",
    text: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setPostInput({
      title: "",
      subtitle: "",
      text: "",
    });
  };

  const isValidInputs = (postInput) => {
    return postInput.title && postInput.subtitle && postInput.text;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInputs(postInput)) return alert("Please fill all the fields");
    await handlePostSave(postInput);
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
        <h1>Create a new post</h1>
        <form onSubmit={onSubmit}>
          <FormInput
            placeholder="Title"
            value={postInput.title}
            autoFocus
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
          />
          <FormInput
            onChange={handleInputChange}
            placeholder="Subtitle"
            value={postInput.subtitle}
            type="text"
            name="subtitle"
            id="subtitle"
          />
          <Textarea
            onChange={handleInputChange}
            name="text"
            value={postInput.text}
            id="text"
            cols="30"
            rows="10"
          />
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

export default CreatePostModal;
