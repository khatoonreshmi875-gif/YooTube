import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../utils/contextApi.js";
import { loginUser } from "../../../../../Api/UserApi.js";
import FormField from "../form/FormField.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setisLoggedin, isLoggedin, getallvideo } = useContext(AppContext);
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
      <div className="flex flex-col items-center h-screen  justify-center pt-24 pb-24">
        <div className=" bg-gradient-to-bl from-cyan-950 via-black to-slate-700 xl:w-5/12 lg:w-3/5 md:w-3/4 sm:w-3/4 w-full lg:p-6 md:p-3  rounded-2xl  flex justify-center flex-col  h-fit pb-5 px-4    ">
          <h1 className="font-bold md:text-3xl text-2xl text-center p-4 font-serif text-gray-400 bg-gradient-to-br from-blue-50 to-slate-600 bg-clip-text text-transparent">
            User Login
          </h1>

          <div>
            <img
              src="/images.jpg"
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
          <div className=" text-center mt-3    ">
            <a
              href="http://localhost:8000/auth/google"
              className="text-black bg-gradient-to-tr from-violet-300 via-blue-200 to-violet-300 sm:px-24 px-8 py-2 rounded-lg shadow-slate-500  active:shadow-transparent shadow-md font-serif sm:font-bold  sm:text-base text-sm font-semibold
                "
            >
              Login with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
