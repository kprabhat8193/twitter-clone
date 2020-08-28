import React, { useState } from "react";
import { Button } from "@material-ui/core";
import database, { auth } from "./firebase";
import db, { provider } from "./firebase";
import TwitterIcon from "@material-ui/icons/Twitter";

import "./LoginScreen.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { getHandle } from "./utils";

const LoginScreen = () => {
  const [state, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).then((result) => {
      //add the user to firestore or update if it exists already
      database
        .collection("users")
        .doc(result?.user?.uid)
        .set({
          name: result?.user?.displayName,
          email: result?.user?.email,
          profilePic: result?.user?.photoURL,
          handle: getHandle(result?.user?.email),
        })
        .then(() => {
          console.log("User added to the users collection!");
        })
        .catch((error) => {
          console.error(
            "Error occurred while adding/update the user on the database!"
          );
        });

      dispatch({
        type: actionTypes.SET_USER,
        user: {
          name: result?.user?.displayName,
          email: result?.user?.email,
          profilePic: result?.user?.photoURL,
          handle: getHandle(result?.user?.email),
          id: result?.user?.uid,
        },
      });
    });
  };
  return (
    <div className="login">
      <div className="login__logo"></div>
      <div className="login__right">
        <div className="right__container">
          <TwitterIcon style={{ fontSize: 50 }} />
          <h2>See what’s happening in the world right now</h2>
          <Button variant="contained" type="button" onClick={login}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
