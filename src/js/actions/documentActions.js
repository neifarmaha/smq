import axios from "axios";
import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_FAIL,
  FETCH_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS,
  GET_DOCUMENTS_FAIL,
  GET_DOCUMENTS_SUCCESS,
  UPLOAD_DOCUMENTS,
  UPLOAD_DOCUMENTS_FAIL,
  UPLOAD_DOCUMENTS_SUCCESS,
} from "../const/documentTypes";

export const getDocuments = (slug) => async (dispatch) => {
  dispatch({
    type: GET_DOCUMENTS,
  });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:1337/api/documents?populate=*&filters[departments][slug]=${encodeURIComponent(
        slug
      )}`,
      config
    );
    console.log("tst", data);
    dispatch({
      type: GET_DOCUMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("get documents fail", error);
    dispatch({
      type: GET_DOCUMENTS_FAIL,
      payload: error.response.data,
    });
  }
};

// creation of document in Strapi

export const uploadDocuments = (doc) => async (dispatch) => {
  dispatch({
    type: UPLOAD_DOCUMENTS,
  });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:1337/api/documents`,
      doc,
      config
    );
    dispatch({
      type: UPLOAD_DOCUMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_DOCUMENTS_FAIL,
      payload: error.response.data,
    });
  }
};

export const fetchDocuments = (slug) => async (dispatch) => {
  dispatch({
    type: FETCH_DOCUMENTS,
  });
  try {
    const response = await axios.get(
      "http://localhost:1337/api/documents?populate[departments][populate]=*&populate=*"
    );
    console.log(response);

    dispatch({
      type: FETCH_DOCUMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    dispatch({
      type: FETCH_DOCUMENTS_FAIL,
      payload: error.response.data,
    });
  }
};
