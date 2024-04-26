import {
  GET_DEPARTMENT,
  GET_DEPARTMENT_FAIL,
  GET_DEPARTMENT_SUCCESS,
} from "../const/departmentTypes";

const initialState = {
  department: [],
  isLoading: false,
  errors: false,
};

const DepartmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DEPARTMENT:
      return { ...state, isLoading: true };

    case GET_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        department: payload.data,
      };
    case GET_DEPARTMENT_FAIL:
      return {
        ...state,
        isLoading: true,
        errors: payload,
      };
    default:
      return state;
  }
};

export default DepartmentReducer;
