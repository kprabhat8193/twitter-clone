import React, { useState } from "react";
import { Button } from "@material-ui/core";
import database, { auth } from "./firebase";
import db, { provider } from "./firebase";
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
        user: result.user,
      });
    });
  };
  return (
    <div className="login">
      <div className="loginContainer">
        <img
          src="https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png"
          alt="twitter"
        />
        <h1>Sign in to Twitter</h1>
        <Button variant="contained" type="button" onClick={login}>
          Sign in with Google
        </Button>{" "}
      </div>
    </div>
  );
};

export default LoginScreen;
