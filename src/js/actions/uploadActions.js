// import axios from "axios";
// import {
//   UPLOAD_DOCUMENTS,
//   UPLOAD_DOCUMENTS_FAIL,
//   UPLOAD_DOCUMENTS_SUCCESS,
// } from "../const/uploadTypes";

// export const uploadDocuments = (doc) => async (dispatch) => {
//   dispatch({
//     type: UPLOAD_DOCUMENTS,
//   });
//   try {
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const { data } = await axios.post(
//       `http://localhost:1337/api/documents`,
//       doc,
//       config
//     );
//     dispatch({
//       type: UPLOAD_DOCUMENTS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPLOAD_DOCUMENTS_FAIL,
//       payload: error.response.data,
//     });
//   }
// };
