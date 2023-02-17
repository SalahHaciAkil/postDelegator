import React from "react";
import Button from "../../Button";

function CreateUserButton({ hidden, onClick, children }) {
  return (
    <div
      style={{
        display: hidden ? "none" : "block",
        position: "fixed",
        bottom: "1rem",
        right: "calc(50% - 100px)",
        zIndex: 1000,
        width: "200px",
      }}
    >
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}

export default CreateUserButton;
