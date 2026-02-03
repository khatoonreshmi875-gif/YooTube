import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../Api/UserApi.js";
import axios from "axios";
import FormField from "./component/FormField.jsx";
import FormImageField from "./component/FormImageField.jsx";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const {
    register: registerLogin,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingRegister },
  } = useForm();
  const navigate = useNavigate();
  async function onRegister(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("channelName", data.channelName || data.fullName);
    formData.append("email", data.email);
    formData.append("description", data.description);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar?.[0] || null); // FileList → first file
    formData.append("coverImage", data.coverImage?.[0] || null);

    const result = await registerUser(formData);
    if (result?.data?.data?.AccessToken) {
      localStorage.setItem("token", result.data.data.AccessToken);
      navigate("/");
    }
  }
  const [dots, setdots] = useState("");
  useEffect(() => {
    setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 1000);
  }, [issubmittingRegister]);
  return (
    <div className="bg-red-100 mx-auto   items-center   bg-gradient-to-r from-cyan-950 via-black to-slate-700  md:p-6 rounded-2xl  h-auto sm:mt-2   w-[98%]  pt-24 pb-24">
      <form onSubmit={handleRegisterSubmit(onRegister)} className="">
        <h1 className="font-bold md:text-3xl  text-2xl text-center p-4 font-serif text-gray-400 bg-gradient-to-br from-blue-50 to-slate-600 bg-clip-text text-transparent">
          Create Your Account
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2   mt-4 md:mr-6  ">
          <div className="flex flex-col justify-center space-y-3 min-w-0  ">
            {" "}
            <FormField
              label="Name"
              name="fullName"
              placeholder="Enter your name"
              register={registerLogin}
              error={errors.fullName}
              type="text"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 6,
                  message: "Name must be at least 6 characters long",
                },
              }}
            />
            <FormField
              label="Username"
              name="username"
              placeholder="Enter your username here..."
              register={registerLogin}
              error={errors.username}
              type="text"
              rules={{
                required: "username is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              }}
            />
            <FormField
              label="Email"
              name="email"
              placeholder="Enter your email here..."
              register={registerLogin}
              error={errors.email}
              type="text"
              rules={{
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[a-zA-Z]{2,}$/,

                  message: "Invalid email format", // message if regex fails
                },
              }}
            />{" "}
            <FormField
              label="Password"
              name="password"
              placeholder="Enter your password here..."
              register={registerLogin}
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
            <FormField
              label="Channel"
              name="channelName"
              placeholder="Enter your channelName here..."
              register={registerLogin}
              error={errors.channelName}
              type="text"
              rules={{
                required: "channelName is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              }}
            />
            <FormField
              label="Description"
              name="description"
              placeholder="Enter your description here..."
              register={registerLogin}
              error={errors.description}
              type="text"
              rules={{
                required: "description is required",
                minLength: {
                  value: 25,
                  message: "Name must be at least 25 words ",
                },
              }}
            />
          </div>
          <div className="w-full mt-8 space-y-8">
            {" "}
            <FormImageField
              label=" Upload Profile Image"
              register={registerLogin}
              error={errors.avatar}
              rules={{ required: "avatar is required" }}
              name="avatar"
              alt="Avatar Preview"
              watch={watch}
            />
            <FormImageField
              label="  Upload Cover Image"
              register={registerLogin}
              error={errors.coverImage}
              rules={{ required: "coverImage is required" }}
              name="coverImage"
              alt="coverImage Preview"
              watch={watch}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-400 via-slate-300 to-cyan-950 w-2/5 p-2 mx-auto rounded-xl block text-white  mt-24 font-serif"
        >
          {issubmittingRegister ? `isSubmitting${dots}` : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
