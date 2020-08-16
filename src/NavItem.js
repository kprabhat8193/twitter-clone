import React from "react";
import "./NavItem.css";

const NavItem = ({ Icon, title, isActive }) => {
  return (
    <div className="navItem">
      <Icon
        fontSize="large"
        style={isActive ? { color: "var(--twitter-color)" } : {}}
      />
      <span style={isActive ? { color: "var(--twitter-color)" } : {}}>
        <h1>{title}</h1>
      </span>
    </div>
  );
};

export default NavItem;
