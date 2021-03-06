import React, { useEffect } from "react";
import ScatterPlotOutlinedIcon from "@material-ui/icons/ScatterPlotOutlined";
import IconButton from "@material-ui/core/IconButton";
import "./Feed.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import TweetBox from "./TweetBox";
import TweetFeed from "./TweetFeed";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";
import { actionTypes } from "./reducer";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("followingm2m")
        .where("follower", "==", `users/${user.id}`)
        .onSnapshot((snapshot) => {
          setFollowing(snapshot.docs.map((doc) => doc.data().following));
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_FOLLOWING,
      following: following,
    });

    const unsubscribe = db
      .collection("tweets")
      .where("by", "in", [...following, `users/${user.id}`]) //user should be able to view his/her tweets as well
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
  }, [following]);

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
        <FlipMove>
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
        </FlipMove>
      </div>
    </div>
  );
};

export default Feed;
