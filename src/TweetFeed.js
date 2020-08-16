import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./TweetFeed.css";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LoopOutlinedIcon from "@material-ui/icons/LoopOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import IconButton from "@material-ui/core/IconButton";

const TweetFeed = () => {
  const [user, setUser] = useState({
    displayName: "Prabhat Kuchibhotla",
    avatarURL:
      "https://lh3.googleusercontent.com/a-/AOh14Gherjmcn6TDDWGFH5tWDcFyFIf8T2uEEOYIDTxJ4VQ",
    handle: "@PrabhatTweets",
  });
  return (
    <div className="tweetFeed feed__box">
      <div className="tweetFeed__box">
        <Avatar src={user.avatarURL} alt={user.displayName} />
        <div className="tweetFeed__right">
          <div>
            <div className="tweetFeed__rightNameBar">
              <h3>{user.displayName}</h3>
              <span className="tweet__handle">
                <h3>{user.handle}</h3>
              </span>
              <span className="tweet__timestamp">
                <h3>2h</h3>
              </span>
            </div>
            <div className="tweetFeed__tweetText">
              <p>
                {`The quick brown fox jumps over the lazy dog. The quick brown
                fox jumps over the lazy dog. The quick brown fox jumps over the
                lazy dog dog`}
              </p>
            </div>
            <div className="tweetFeed__options">
              <IconButton>
                <ChatBubbleOutlineRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <LoopOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <ShareOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetFeed;
