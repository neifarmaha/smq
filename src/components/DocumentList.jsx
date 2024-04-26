import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getDocuments } from "../js/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../utils/endpoints";

const DocumentList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const { documents } = useSelector((state) => state.documents);
  const [permittedUsers, setPermittedUsers] = useState([]);
  console.log(
    "documentList documents departments",
    documents
      .map((el) =>
        el.attributes.departments.data.map((el) => el.attributes.type)
      )
      .flatMap((el) => el)
  );
  console.log(localStorage.getItem("userId"));
  console.log("connected user department", authUser.department);

  useEffect(() => {
    console.log("params changed", documents);

    setPermittedUsers(
      documents
        .map((el) =>
          el.attributes?.users_permissions_users?.data.map(
            (el) => el.attributes.username
          )
        )
        .flatMap((el) => el)
    );
  }, [documents, params.department]);

  // const [filter, setFilter] = useState("");
  // const handleFilterChange = (event) => {
  //   setFilter(event.target.value);
  // };

  // const filteredDocuments = documents.filter(
  //   (document) => document.attributes.users_permissions_users.data    === filter
  // );

  console.log(documents[0]?.attributes?.users_permissions_users?.data);
  console.log(
    documents
      .map((el) =>
        el.attributes?.users_permissions_users?.data.map(
          (el) => el.attributes.username
        )
      )
      .flatMap((el) => el)
  );

  return (
    <div>
      <ul>
        {authUser?.documents?.map((document) => (
          <li key={document.id}>
            <Link
              className="text-blue-800 underline underline-offset-1 font-semibold"
              to={`/document/${document.id}`}
            >
              {document?.Title}
              {/* {`${serverURL}${document?.attributes?.file?.attributes?.url}`} */}
              {/* See pdf file */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
