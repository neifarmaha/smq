import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Login } from "../js/actions/userActions";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, user, authUser } = useSelector((state) => state.user);
  console.log(authUser);
  console.log(isLoading);

  // const loginExistedUser = (e) => {
  //   e.preventDefault();
  //   dispatch(Login({ email, password }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login({ identifier: email, password }));
  };

  return localStorage.getItem("token") ? (
    <Navigate
      to={`/${localStorage.getItem("department")?.replace(/\s/g, "_")}`}
    />
  ) : (
    <div className="mt-[2%]  ">
      <div className="h-11 w-11 bg-slate-300 rotate-12   ml-[90%]"></div>
      <div className="h-11 w-11 bg-red-600 rotate-12   ml-[80%]"></div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-28 w-auto"
            src="/images/Logo-V.jpg"
            alt="ZetaBox Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
            Sign in to your account
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div
            for="email"
            className=" ml-[40%] text-lg  text-left font-medium leading-6 text-gray-900"
          >
            Email address
          </div>
          <div className="mt-2 ">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="text-center flex-center w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-around ">
            <label
              for="password"
              className="text-center ml-[36%] block text-lg font-medium leading-6 text-gray-900 "
            >
              Password
            </label>
            <div class="text-sm mr-[36%]">
              <Link
                href="#"
                class=" text-lg font-semibold text-gray-500 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class=" text-center flex-center w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className=" text-lg tracking-widest flex-center w-96  justify-center rounded-md bg-red-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm   hover:scale-[0.9] h-[40px] transition duration-700  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
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
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
      <div className="flex h-11 w-11 bg-red-600 rotate-12 ml-[20%]"></div>
      <div className="h-11 w-11 bg-gray-500 rotate-12   ml-[40%]"></div>
    </div>
  );
};
export default Signin;
