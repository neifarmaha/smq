import {
  FETCH_DOCUMENTS_FAIL,
  FETCH_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS,
  GET_DOCUMENTS_FAIL,
  GET_DOCUMENTS_SUCCESS,
  UPLOAD_DOCUMENTS,
  UPLOAD_DOCUMENTS_FAIL,
  UPLOAD_DOCUMENTS_SUCCESS,
} from "../const/documentTypes";

const initialState = {
  documents: [],
  isLoading: false,
  errors: null,
};

const DocumentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOCUMENTS:
      return { ...state, isLoading: true };
    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        documents: payload.data,
      };
    case GET_DOCUMENTS_FAIL:
      return {
        ...state,
        isLoading: true,
        errors: payload,
      };
    case UPLOAD_DOCUMENTS:
      return { ...state, isLoading: true };
    case UPLOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        documents: payload.data,
      };
    case UPLOAD_DOCUMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: payload.data,
        isLoading: false,
        errors: null,
      };
    case FETCH_DOCUMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
export default DocumentsReducer;
