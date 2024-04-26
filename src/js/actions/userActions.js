import axios from "axios";
import {
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../const/userTypes";

export const getUser = (id) => async (dispatch) => {
  dispatch({
    type: GET_USER,
  });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:1337/api/users/${id}/?populate=*`,
      config
    );
    console.log("user data", data);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("get users fail", error);
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const Login = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  try {
    const { data } = await axios.post(
      "http://localhost:1337/api/auth/local",
      user
    );
    console.log("data from login endpoint", data);
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("userId", data?.user?.id);
    localStorage.setItem("department", data?.user?.department);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("department");
  return {
    type: LOGOUT,
  };
};
