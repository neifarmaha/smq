import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDocuments } from "../js/actions/documentActions";
import { getUser } from "../js/actions/userActions";

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

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("userId")));
    dispatch(getDocuments(params.department));
  }, [])
  

  useEffect(() => {
    console.log("params changed", documents);
    console.log("docs",documents?.filter(el=>permittedUsers.includes(authUser.username)))
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
    <div className="flex-col" >
      <div className="text-3xl items-start font-bold">
          <h1 className="felx-start left-0" > {params.department} Documents  </h1>
      </div>
      <div>
        <ul>
          {documents?.filter(el=>permittedUsers.includes(authUser.username)).map((document) => (
            <li key={document.id}>
              <Link
                className="text-blue-800 underline underline-offset-1 font-semibold"
                to={`/document/${document.id}`}
              >
                {document?.attributes?.Title}
                {/* {`${serverURL}${document?.attributes?.file?.attributes?.url}`} */}
                {/* See pdf file */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentList;
