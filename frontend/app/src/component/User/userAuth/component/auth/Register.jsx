import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../../../Api/UserApi.js";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import FormButton from "../../../../utils/form/FormButton.jsx";
import FormImageField from "../../../../utils/form/FormImageField.jsx";
import FormField from "../../../../utils/form/FormField.jsx";
import Heading from "../../../../utils/form/Heading.jsx";

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
    <div className="bg-white mx-auto   items-center     md:p-6 rounded-2xl  h-auto sm:mt-2   w-[98%]  pb-24">
      <form onSubmit={handleRegisterSubmit(onRegister)} className="">
        <Heading label="Create Your Account" />
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
              message={
                "Recommended size:240 × 240.  If not, the image may appear cropped or distorted."
              }
            />
            <FormImageField
              label="  Upload Cover Image"
              register={registerLogin}
              error={errors.coverImage}
              name="coverImage"
              alt="coverImage Preview"
              watch={watch}
              message={
                "Recommended size:2560 × 480.  If not, the image may appear cropped or distorted."
              }
              rules={{
                validate: (fileList) => {
                  // Case 1: no image provided
                  if (!fileList || fileList.length === 0) {
                    return "coverImage is required";
                  }

                  // Case 2: check dimensions
                  const file = fileList[0];
                  return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                      if (img.width !== 2560 || img.height !== 480) {
                        resolve("Image must be exactly 2560 × 480 pixels");
                      } else {
                        resolve(true);
                      }
                    };
                    img.src = URL.createObjectURL(file);
                  });
                },
              }}
            />
          </div>
        </div>
        <FormButton navigate={navigate} issubmitting={issubmittingRegister} />
      </form>
    </div>
  );
};

export default Register;
