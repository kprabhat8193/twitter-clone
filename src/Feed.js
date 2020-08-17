import React, { useEffect } from "react";
import ScatterPlotOutlinedIcon from "@material-ui/icons/ScatterPlotOutlined";
import IconButton from "@material-ui/core/IconButton";
import "./Feed.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import TweetBox from "./TweetBox";
import TweetFeed from "./TweetFeed";
import db from "./firebase";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = db.collection("tweets").onSnapshot((snapshot) => {
      setTweets(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
      {tweets.map((tweet) => (
        <TweetFeed tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
};

export default Feed;