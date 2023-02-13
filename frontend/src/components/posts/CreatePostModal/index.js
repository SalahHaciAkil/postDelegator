import React from "react";
import FormInput from "../../FormInput/FormInput.js";
import Modal from "../../Modal/index.js";
import Textarea from "../../Textarea/index.js";

function CreatePostModal({ isOpen, handleClose }) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h1>Create a new post</h1>
      <form>
        <FormInput placeholder="Title" type="text" name="title" id="title" />
        <FormInput placeholder="Subtitle" type="text" name="title" id="title" />
        <Textarea name="text" id="text" cols="30" rows="10"></Textarea>
      </form>
    </Modal>
  );
}

export default CreatePostModal;
