import axios from "axios";
import {
  GET_DEPARTMENT,
  GET_DEPARTMENT_FAIL,
  GET_DEPARTMENT_SUCCESS,
} from "../const/departmentTypes";

export const getDepartment = () => async (dispatch) => {
  dispatch({
    type: GET_DEPARTMENT,
  });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:1337/api/departments`,
      config
    );
    console.log(" ", data);
    dispatch({
      type: GET_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("get department fail", error);
    dispatch({
      type: GET_DEPARTMENT_FAIL,
      payload: error.response.data,
    });
  }
};
