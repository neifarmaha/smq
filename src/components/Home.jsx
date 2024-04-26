import React, { useEffect } from "react";
import Layout from "./Layout/Layout";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../js/actions/userActions";
import { getDocuments } from "../js/actions/documentActions";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const params = useParams();
  console.log("params are", params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("userId")));
    dispatch(getDocuments(params.department));

    // dispatch(getDocuments(params.id));
    // http://localhost:1337/api/documents?populate=*&filters[departments][slug]=quality_security
  }, [params.department]);

  return <>{!token ? <Navigate to="/" /> : <Layout></Layout>}</>;
};

export default Home;
