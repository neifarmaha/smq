import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { uploadURL } from "../utils/endpoints";
import { uploadDocuments } from "../js/actions/documentActions";
import { Link } from "react-router-dom";

const UploadForm = ({ setShow }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [ref, setRef] = useState("");
  const [file, setFile] = useState();
  const [fileId, setFileId] = useState();
  const [selectedDepartment, setselectedDepartment] = useState();

  const { isLoading } = useSelector((state) => state.documents);
  const { department } = useSelector((state) => state.department);

  const uploadFile = async () => {
    try {
      const data = new FormData();
      data.append("files", file[0]);
      console.log(data);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(uploadURL, data, config);
      setFileId(response?.data[0]?.id);

      if (response.statusText !== "OK") {
        throw new Error(`Upload failed with status ${response}`);
      }
      console.log(response.data[0]?.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  console.log(isLoading);

  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var doc = {
      data: {
        Title: title,
        Ref: ref,
        file: fileId,
        departments: selectedDepartment,
      },
    };

    await dispatch(uploadDocuments(doc));
    setShow(false);
  };

  const handleChange = (e) => {
    setselectedDepartment(e.target.value);
  };

  return (
    <div>
      <div
        className="fixed bg-gray-900 bg-opacity-50 w-screen h-screen top-0 left-0 z-50 flex flex-col justify-center items-center"
        onClick={() => setShow(false)}
      >
        <div
          className="md:rounded-xl xl:w-1/3 md:w-1/2 w-full max-lg:h-screen overflow-auto  bg-white md:p-5 p-2 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            onSubmit={handleSubmit}
            name="upload form"
            className="min-h-[50vh]"
          >
            <div className="mt-14">
              <div>
                <input
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                  type="file"
                  className="text-sm w-96 mt-6 justify-center rounded-md bg-gray-100 px-3 py-1.5 font-bold leading-6 text-black shadow-sm h-[40px] hover:bg-gray-200"
                />
              </div>
              <div>
                <div className=" mt-3 ml-[16%] text-[15px] font-poppins text-left font-semibold leading-6 text-gray-900">
                  Title
                </div>

                <input
                  id="title"
                  name="title"
                  type="title"
                  className="pl-2 flex-center w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                ></input>
              </div>
              <div>
                <div className=" mt-4 ml-[16%] text-[15px]font-poppins text-left font-semibold leading-6 text-gray-900">
                  Ref
                </div>
                <input
                  id="ref"
                  name="ref"
                  type="ref"
                  className="pl-2 flex-center w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setRef(e.target.value)}
                  value={ref}
                ></input>
              </div>

              <div>
                <div className=" mt-3 ml-[16%] text-[15px] font-poppins text-left font-semibold leading-6 text-gray-900">
                  Select Department
                </div>
                <div>
                  <select
                    id="myDropdown"
                    value={selectedDepartment}
                    className="  mt-4 pl-2 flex-center w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  >
                    {department?.map((el) => (
                      <option>{el?.attributes?.type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-around pl-[16%] pr-[16%]">
                <div className="mt-10 justify-center cursor-pointer h-[50px] w-36 bg-slate-800 bg-opacity-90 rounded-lg gap-2.5 inline-flex">
                  <button
                    type="submit"
                    className=" font-poppins  font-semibold text-white"
                  >
                    {isLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
                <div className="justify-center mt-10 ml-[47%] cursor-pointer h-[50px] w-36 bg-slate-800 bg-opacity-90 rounded-lg gap-2.5 inline-flex">
                  <button
                    className="  font-poppins font-semibold text-white"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
