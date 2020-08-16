import React, { useState } from "react";
import { Avatar, TextField } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import GifIcon from "@material-ui/icons/Gif";
import BarChartIcon from "@material-ui/icons/BarChart";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import "./Feed.css";

const TweetBox = () => {
  const [tweetText, setTweetText] = useState("");
  return (
    <div className="feed__tweetEditor feed__box">
      <Avatar
        src="https://lh3.googleusercontent.com/a-/AOh14Gherjmcn6TDDWGFH5tWDcFyFIf8T2uEEOYIDTxJ4VQ"
        alt="Prabhat Kuchibhotla"
        className="feed__avatar"
      />
      <div className="feed__tweetEditorRight">
        <TextField
          margin="normal"
          value={tweetText}
          type="text"
          fullWidth
          multiline
          placeholder="What's happening?"
          onChange={(e) => setTweetText(e.target.value)}
        />
        <div className="feed__tweetEditorOptions">
          <div className="feed__tweetEditorOptionsLeft">
            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
            <IconButton>
              <GifIcon />
            </IconButton>
            <IconButton>
              <BarChartIcon />
            </IconButton>
            <IconButton>
              <SentimentSatisfiedOutlinedIcon />
            </IconButton>
            <IconButton>
              <EventOutlinedIcon />
            </IconButton>
          </div>
          <Button variant="contained">Tweet</Button>
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
