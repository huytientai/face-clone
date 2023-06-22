import { Facebook } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTION } from "../redux";
import { useEffect } from "react";

export function Login() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) return navigate("/");
  }, [user]);

  useEffect(() => {
    if (!user && auth.currentUser)
      dispatch({ type: USER_ACTION, user: auth.currentUser });
  }, [auth.currentUser]);

  function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((value) => {
        console.log(value);

        console.log(value.user);

        dispatch({
          type: USER_ACTION.SET,
          user: value.user,
        });
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <Box
      sx={(theme) => ({
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background.default,

        position: "relative",
      })}
    >
      <Facebook
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: 70,
        }}
      />

      <Button
        variant="contained"
        sx={{
          mt: 100,
          position: "absolut",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={signInWithGoogle}
      >
        Login with Google
      </Button>
    </Box>
  );
}
