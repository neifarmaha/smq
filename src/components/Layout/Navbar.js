import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UploadForm from "../UploadForm";
import { logout } from "../../js/actions/userActions";

const Navbar = () => {
  const params = useParams();
  console.log("params from home page", params);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  console.log(authUser?.departments);
  const { departments } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  return (
    <div className="pl-64">
      <div className="h-20 p-6 flex justify-end items-center">
        <div
          className="h-16 w-16 rounded-full bg-gray-600 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="text-[26px] mt-3 text-white">
            {authUser?.FirstName[0]}
            {authUser?.LastName[0]}
          </div>
        </div>
        {showDropdown && (
          <div className="h-80 w-86 bg-gray-100 md:rounded-xl absolute right-4 top-20 z-10">
            <p className="font-bold text-[20px] mt-[15%]">
              {`${authUser?.FirstName} ${authUser?.LastName}`}
            </p>
            <p className="mt-10 font-semibold">
              {authUser?.departments[0]?.type}
            </p>
            {/* <div>{departments?.type}</div> */}
            <p className="mt-[12%] font-semibold">{authUser?.email}</p>
            <div className="flex justify-around mt-[60px] ml-6 mr-6 ">
              <div>
                <button
                  onClick={() => setShow(true)}
                  type="submit"
                  className=" text-lg w-28 rounded-l-lg bg-slate-800 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm   hover:scale-[0.9] h-[40px] transition duration-700  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Upload
                </button>{" "}
              </div>
              <div className=" flex justify-end w-1/2">
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                  type="submit"
                  className=" text-lg w-36 rounded-r-lg bg-slate-800 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm   hover:scale-[0.9] h-[40px] transition duration-700  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {show && <UploadForm show={show} setShow={setShow} />}
    </div>
  );
};

export default Navbar;
