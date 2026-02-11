import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userImage from "../../../../../assets/images.jpg";
import bgImage from "../../../../../assets/dark_blue_background_hd_navy_blue-1366x768 (1).jpg";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../utils/contextApi.js";
import { loginUser } from "../../../../../Api/UserApi.js";
import FormField from "../form/FormField.jsx";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { setisLoggedin, isLoggedin } = useContext(AppContext);
  const [dots, setDots] = useState("");

  const {
    register: registerSignin,
    handleSubmit: handleLoginSubmit,

    setError,
    formState: { errors, isSubmitting: isSubmittingLogin },
  } = useForm();
  async function onLogin(userdata) {
    try {
      const result = await loginUser(userdata);
      setisLoggedin(result?.data?.success);
      console.log(result?.data?.success);

      if (result?.data?.data?.AccessToken) {
        localStorage.setItem("token", result.data.data.AccessToken);
      }
    } catch (err) {
      console.log("loginerr", err);
      if (err?.response?.data?.message === "invalid user credentials") {
        setError("password", {
          type: "manual",
          message: "Invalid user credentials",
        });
      }
      if (err?.response?.data?.message === "User does not exist") {
        setError("email", {
          type: "manual",
          message: "Email not found",
        });
      }
    }
  }
  useEffect(() => {
    if (isLoggedin) {
      const timeoutId = setTimeout(() => {
        navigate("/"); // redirect to home
        // reload the page if needed
      }, 10);

      return () => clearTimeout(timeoutId); // cleanup
    }
  }, [isLoggedin, navigate]);
  useEffect(() => {
    if (isSubmittingLogin) {
      setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 400);
    }
  }, [isSubmittingLogin]);
  return (
    <>
      <div className="flex flex-col items-center h-screen  justify-center pt-24 pb-24 ">
        <div className=" bg-gradient-to-bl from-cyan-950 via-black to-slate-700 xl:w-5/12 lg:w-3/5 md:w-3/4 sm:w-3/4 w-full lg:p-6 md:p-3  rounded-2xl  flex justify-center flex-col  h-fit pb-5 px-4    ">
          <h1 className="font-bold md:text-3xl text-2xl text-center p-4 font-serif text-gray-400 bg-gradient-to-br from-blue-50 to-slate-600 bg-clip-text text-transparent">
            User Login
          </h1>

          <div>
            <img
              src={userImage}
              alt=""
              className="w-24 h-24 rounded-full mx-auto object-fill "
            />
          </div>
          <form
            onSubmit={handleLoginSubmit(onLogin)}
            className="space-y-8 mt-8"
          >
            <FormField
              label="Email"
              name="email"
              placeholder="Enter your email here..."
              register={registerSignin}
              error={errors.email}
              type="text"
              rules={{
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[a-zA-Z]{2,}$/,

                  message: "Invalid email format", // message if regex fails
                },
              }}
            />
            <FormField
              label="Password"
              name="password"
              placeholder="Enter your password here..."
              register={registerSignin}
              error={errors.password}
              type="text"
              rules={{
                required: "password is required",
                pattern: {
                  value: /^[a-zA-Z]+[0-9]+$/,
                  message: "Invalid password format", // message if regex fails
                },
              }}
            />

            <p
              className="text-blue-300"
              onClick={() => navigate(`/forget-password`)}
            >
              Forgot your password
            </p>
            <button
              type="submit"
              className="w-[50%]  bg-gradient-to-tr from-violet-300 via-blue-200 to-violet-300  text-black py-2 px-4 rounded-lg  mx-auto block font-serif shadow-slate-500 shadow-md sm:text-base text-sm  "
            >
              {isSubmittingLogin ? `onSubmitting${dots}` : "Log in"}
            </button>
          </form>
          <p className="text-center text-white text-lg font-serif mt-3">Or</p>
          <div className=" text-center mt-3  ">
            <a
              href="http://localhost:8000/auth/google"
              className="text-black bg-gradient-to-tr from-violet-300 via-blue-200 to-violet-300 sm:px-24 px-8 py-2 rounded-lg shadow-slate-500  active:shadow-transparent shadow-md font-serif sm:font-bold  sm:text-base text-sm font-semibold flex justify-center 
                "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.2-.93 2.22-1.98 2.9v2.41h3.2c1.87-1.72 2.95-4.25 2.95-7.29 0-.62-.06-1.22-.17-1.8z"
                />
                <path
                  fill="#34A853"
                  d="M12.18 21c2.7 0 4.97-.89 6.63-2.41l-3.2-2.41c-.89.6-2.03.96-3.43.96-2.64 0-4.88-1.78-5.68-4.18H3.22v2.62C4.87 18.98 8.28 21 12.18 21z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.5 13.96c-.2-.6-.32-1.24-.32-1.96s.12-1.36.32-1.96V7.42H3.22A8.8 8.8 0 0 0 2.5 12c0 1.42.34 2.76.72 3.96l3.28-2z"
                />
                <path
                  fill="#EA4335"
                  d="M12.18 5.5c1.47 0 2.79.51 3.83 1.51l2.87-2.87C17.15 2.55 14.88 1.5 12.18 1.5 8.28 1.5 4.87 3.52 3.22 7.42l3.28 2.62c.8-2.4 3.04-4.18 5.68-4.18z"
                />
              </svg>
              Login with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
