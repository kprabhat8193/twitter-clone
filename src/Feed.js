import React from "react";
import ScatterPlotOutlinedIcon from "@material-ui/icons/ScatterPlotOutlined";
import IconButton from "@material-ui/core/IconButton";
import "./Feed.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import TweetBox from "./TweetBox";
import TweetFeed from "./TweetFeed";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed__header feed__box">
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <IconButton>
          <ScatterPlotOutlinedIcon fontSize="large" />
        </IconButton>
      </div>
      <TweetBox />
      <TweetFeed />
    </div>
  );
};

export default Feed;
