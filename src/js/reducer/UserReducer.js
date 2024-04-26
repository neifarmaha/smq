import {
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../const/userTypes";

const initialState = {
  isLoading: false,
  user: null,
  isAuth: false,
  authUser: null,
  token: localStorage.getItem("token") || null,
  errors: null,
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.jwt,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null,
        token: null,
        errors: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null,
        token: null,
        authUser: null,
      };
    case GET_USER:
      return { ...state, isLoading: true };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authUser: payload,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        errors: payload,
        authUser: null,
      };

    default:
      return state;
  }
};
export default UserReducer;
