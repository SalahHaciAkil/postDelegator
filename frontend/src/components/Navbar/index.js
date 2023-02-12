import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
function Navbar() {
  return (
    <div className={styles.navbar}>
      <NavLink
        to="/"
        style={({ isActive }) => {
          return {
            color: isActive ? "#3778ff" : "black",
          };
        }}
      >
        Users
      </NavLink>
      <NavLink
        to="/posts"
        style={({ isActive }) => {
          return {
            color: isActive ? "#3778ff" : "black",
          };
        }}
      >
        Posts
      </NavLink>
    </div>
  );
}

export default Navbar;
