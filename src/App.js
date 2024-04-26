import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Signin from "./components/SignIn";
import Home from "./components/Home";
import Sidebar from "./components/Layout/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./js/actions/userActions";
import DocumentDetails from "./components/DocumentDetails";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("userId")));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* routes??? */}
          <Route path="/" element={<Signin />} />
          <Route path="/:department" element={<Home />} />
          <Route path="/document/:id" element={<DocumentDetails />} />
          {/* <Link to=""></Link> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
