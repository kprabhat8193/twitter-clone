import React, { useState } from "react";
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
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import "./Sidebar.css";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import TweetBox from "./TweetBox";

const Sidebar = ({ isActive }) => {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: 0,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="sidebar">
      <nav className="sidebar__container">
        <Link to="/">
          <IconButton>
            <TwitterIcon className="sidebar__logo" fontSize="large" />
          </IconButton>
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
        <div className="sidebar__tweetButton">
          <Button variant="contained" onClick={handleOpen}>
            Tweet
          </Button>
          <Modal
            aria-labelledby="tweet-box"
            className={classes.modal}
            open={modalOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modalOpen}>
              <div className={classes.paper}>
                <TweetBox id="tweet-box" />
              </div>
            </Fade>
          </Modal>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
