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
import PdfThumbnail from "./components/PdfThumbnail";
import Pdfminiatures from "./components/Pdfminiatures";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(localStorage.getItem("userId")));
  }, []);
  const pdfUrl =
    "http://localhost:1337/uploads/2nd_meeting_report_a8e123bbfe.pdf";
  return (
    <div className="App">
      {/* <h1>PDF Thumbnails</h1> */}
      {/* <PdfThumbnail pdfUrl="test.pdf" /> */}
      {/* <PdfThumbnail /> */}

      <h1>PDF Miniature Example</h1>
      {/* Pass pdfUrl as the pdfUrl prop */}
      <Pdfminiatures pdfUrl={pdfUrl} />

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
