import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverURL } from "../utils/endpoints";

const DocumentDetails = () => {
  const [doc, setDoc] = useState();

  const params = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  useEffect(() => {
    const getDoc = async () => {
      try {
        let res = await axios.get(
          `http://localhost:1337/api/documents/${params.id}?populate=*`,
          config
        );
        setDoc(res.data.data.attributes);
        console.log(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDoc();
  }, []);

  return (
    <div>
      <a
        className="text-blue-800 underline underline-offset-1 font-semibold text-[18px]"
        href={`${serverURL}${doc?.file?.data?.attributes?.url}`}
        target="_blank"
      >
        {doc?.Title}
      </a>
    </div>
  );
};

export default DocumentDetails;
