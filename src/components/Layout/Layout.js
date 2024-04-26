import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import DocumentList from "../DocumentList";
import DropdownList from "./dropdown";

// import Pdfminiature from "../Pdfminiature";

const Layout = ({ children }) => {
  return (
    <div className="background">
      <Sidebar></Sidebar>
      <div className="pl-64 w-full h-screen">
        <Navbar></Navbar>
        {/* <div className="h-page w-full pl-16 bg-green-700">{children}</div> */}
        <DocumentList></DocumentList>

        {/* <Pdfminiature
          pdfUrl={
            "http://localhost:1337/uploads/2nd_meeting_report_a8e123bbfe.pdf"
          }
        ></Pdfminiature> */}
      </div>
    </div>
  );
};

export default Layout;
