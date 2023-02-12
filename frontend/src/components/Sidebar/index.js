import React from "react";
import { NavLink } from "react-router-dom";
import { REACT_APP_NAME } from "../../constants/env";
import styles from "./Sidebar.module.scss";
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.logo}>{REACT_APP_NAME}</h1>
      <ul>
        <li>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? { color: "#3778ff", backgroundColor: "#f8f8f8" }
                : { color: "black" }
            }
            to="/"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? { color: "#3778ff", backgroundColor: "#f8f8f8" }
                : { color: "black" }
            }
            to="/posts"
          >
            Posts
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
