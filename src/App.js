import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Provider, useDispatch } from "react-redux";
import { USER_ACTION, store } from "./redux";
import { Home } from "./pages/Home";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("change user: ", user);
        dispatch({ type: USER_ACTION.SET, user: user });
        return;
      }

      dispatch({ type: USER_ACTION.REMOVED, user: user });
    });

    return () => unsub();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
