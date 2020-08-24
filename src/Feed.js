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
    const unsubscribe = db
      .collection("tweets")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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

      <div className="feed__scrollable">
        <TweetBox />
        {tweets.map((tweet) => (
          <TweetFeed
            by={tweet?.by}
            timestamp={tweet?.timestamp}
            tweetText={tweet?.tweetText}
            key={tweet?.id}
            comments={tweet?.comments}
            retweets={tweet?.retweets}
            likes={tweet?.likes}
            id={tweet?.id}
            image={tweet?.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
