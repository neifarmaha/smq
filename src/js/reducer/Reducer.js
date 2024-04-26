import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import DocumentsReducer from "./DocumentsReducer";
import DepartmentReducer from "./DepartmentReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  documents: DocumentsReducer,
  department: DepartmentReducer,
  test: testReducer,
});

export default rootReducer;
