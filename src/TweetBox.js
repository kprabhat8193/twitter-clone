import React, { useState } from "react";
import { Avatar, TextField } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import GifIcon from "@material-ui/icons/Gif";
import BarChartIcon from "@material-ui/icons/BarChart";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import firebase from "firebase";
import "./Feed.css";
import "./TweetBox.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

const TweetBox = () => {
  const [tweetText, setTweetText] = useState("");
  const [{ user }] = useStateValue();

  const handlePostTweet = (e) => {
    e.preventDefault();

    if (tweetText) {
      db.collection("tweets")
        .add({
          by: "users/" + user?.uid,
          tweetText: tweetText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    setTweetText("");
  };

  return (
    <div className="feed__tweetEditor feed__box">
      <Avatar src={user?.photoURL} alt={user?.name} className="feed__avatar" />
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
          <Button variant="contained" type="submit" onClick={handlePostTweet}>
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
