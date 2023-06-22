import { useDispatch, useSelector } from "react-redux";
import { COUNT_ACTION, USER_ACTION } from "../redux";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const moviesCollection = collection(db, "movies");

  useEffect(() => {
    console.log("cur user: ", auth.currentUser);

    console.log("user: ", user);

    if (!user) {
      if (auth.currentUser) {
        dispatch({ type: USER_ACTION.SET, user: auth.currentUser });
        getMovies();
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      return;
    }
  }, []);

  if (!user) return null;

  async function handleAddData() {
    try {
      const newMovie = {
        title: "new Movie",
        releaseDate: new Date(),
        hot: false,
      };

      const docRef = await addDoc(moviesCollection, newMovie);

      console.log("Success--firebase--write-data:  ");
      console.log("___ ", docRef);
    } catch (err) {
      console.log("error--firestore--add-data:  ", err);
    }
  }

  async function getMovies() {
    try {
      const data = await getDocs(moviesCollection);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log("success--firestore--get-data: ");
      console.log("____ ", filteredData);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSignOut() {
    console.log("sign out");
    await auth.signOut();

    navigate(0);
  }

  return (
    <>
      <h1>home</h1>
      <h2>test</h2>

      <Typography>hello {user.email}</Typography>
      <button onClick={handleSignOut}>signout</button>

      <br />
      <br />
      <button onClick={handleAddData}>add data to firestore</button>
    </>
  );
}
