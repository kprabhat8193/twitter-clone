import React, { useState, useEffect } from "react";
import { Avatar, TextField } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import GifIcon from "@material-ui/icons/Gif";
import BarChartIcon from "@material-ui/icons/BarChart";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Picker from "emoji-picker-react";

import firebase from "firebase";
import "./Feed.css";
import "./TweetBox.css";
import db, { storageRef } from "./firebase";
import { useStateValue } from "./StateProvider";

const TweetBox = () => {
  const [tweetText, setTweetText] = useState("");
  const [{ user }] = useStateValue();
  const [imageFileURL, setImageFileURL] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const { emoji } = emojiObject;
    setChosenEmoji(emoji);
  };

  useEffect(() => {
    setTweetText(tweetText + chosenEmoji);
  }, [chosenEmoji]);

  const handlePostTweet = (e) => {
    e.preventDefault();

    if (tweetText) {
      db.collection("tweets")
        .add({
          by: "users/" + user?.uid,
          tweetText: tweetText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          imageURL: imageFileURL,
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

  const onImageChange = async (e) => {
    setDisabled(true);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(">>>IMAGE uploaded ", file.name);
      const fileRef = storageRef.child(file.name);
      const uploadTask = await fileRef.put(file);
      uploadTask.task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.error("User not authorized to upload image!");
              break;

            case "storage/canceled":
              console.error("User cancelled the upload!");
              break;

            case "storage/unknown":
              console.error("Unknown error occurred: ", error.serverResponse);
              break;
          }
        },
        () => {
          //upload completed successfully.
          uploadTask.task.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {
              console.log("File available at", downloadURL);
              setImageFileURL(downloadURL);
            });
        }
      );
    }
    setDisabled(false);
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
          autoFocus
          placeholder="What's happening?"
          onChange={(e) => setTweetText(e.target.value)}
        />
        <div className="feed__tweetEditorOptions">
          <div className="feed__tweetEditorOptionsLeft">
            <div className="tweetOptions__input">
              <input type="file" id="file-upload" onChange={onImageChange} />

              <IconButton className="tweetOptions__button">
                <label htmlFor="file-upload">
                  <ImageOutlinedIcon />
                </label>
              </IconButton>
            </div>
            <div className="tweetOptions__input">
              <input type="file" id="file-upload" />

              <IconButton className="tweetOptions__button">
                <label htmlFor="file-upload">
                  <GifIcon />
                </label>
              </IconButton>
            </div>

            <IconButton className="tweetOptions__button">
              <BarChartIcon />
            </IconButton>

            <IconButton
              className="tweetOptions__button"
              onClick={(e) => setDisplayEmojiPicker(!displayEmojiPicker)}
            >
              <SentimentSatisfiedOutlinedIcon />
            </IconButton>
            <IconButton className="tweetOptions__button">
              <EventOutlinedIcon />
            </IconButton>
          </div>
          <Button
            variant="contained"
            type="submit"
            disabled={disabled}
            onClick={handlePostTweet}
          >
            Tweet
          </Button>
        </div>
        {displayEmojiPicker && (
          <div className="tweetBox__emojiPicker">
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              groupNames={{ smileys_people: "PEOPLE" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetBox;
