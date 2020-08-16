import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";

import "./Sidebar.css";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const Sidebar = ({ isActive }) => {
  return (
    <div className="sidebar">
      <nav className="sidebar__container">
        <Link to="/">
          <TwitterIcon className="sidebar__logo" fontSize="large" />
        </Link>
        <Link to="/">
          <NavItem
            Icon={HomeOutlinedIcon}
            title="Home"
            isActive={"home" === isActive}
          />
        </Link>

        <Link to="/explore">
          <NavItem
            Icon={ExploreOutlinedIcon}
            title="Explore"
            isActive={"explore" === isActive}
          />
        </Link>
        <Link to="/notifications">
          <NavItem
            Icon={NotificationsOutlinedIcon}
            title="Notifications"
            isActive={"notifications" === isActive}
          />
        </Link>
        <Link to="/messages">
          <NavItem
            Icon={EmailOutlinedIcon}
            title="Messages"
            isActive={"messages" === isActive}
          />
        </Link>
        <Link to="bookmarks">
          <NavItem
            Icon={BookmarkBorderOutlinedIcon}
            title="Bookmarks"
            isActive={"bookmarks" === isActive}
          />
        </Link>
        <Link to="/lists">
          <NavItem
            Icon={FilterNoneIcon}
            title="Lists"
            isActive={"lists" === isActive}
          />
        </Link>
        <Link to="/profile">
          <NavItem
            Icon={PersonOutlineIcon}
            title="Profile"
            isActive={"profile" === isActive}
          />
        </Link>
        <NavItem
          Icon={MoreHorizIcon}
          title="More"
          isActive={"more" === isActive}
        />
        <Button variant="contained">Tweet</Button>
      </nav>
    </div>
  );
};

export default Sidebar;
