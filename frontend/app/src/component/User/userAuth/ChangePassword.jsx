import React from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../../../Api/UserApi.js";
import { FaLock } from "react-icons/fa";

import Navbar from "../../Navigation/navbar/page/Navbar.jsx";
import Sidebar from "../../Navigation/sidebar/Sidebar.jsx";
import FormField from "./component/FormField.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const [dots, setdots] = useState(".");
  const navigate = useNavigate();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingPassword },
  } = useForm();

  async function onPasswordSubmit(userdata) {
    try {
      const result = await changePassword(userdata);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  }
  useEffect(() => {
    setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 1000);
  }, [issubmittingPassword]);
  return (
    <>
      <div className="h-full w-full bg-gradient-to-bl from-slate-950 to-slate-900 pt-28">
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="w-full sx:w-3/5 lg:w-2/5 sx:mx-auto space-y-5 p-5 rounded-xl bg-gradient-to-r from-cyan-950 via-black to-slate-700 mr-2 sx:mt-4  "
        >
          <FaLock className="h-5 w-5 text-gray-400 mr-2" />

          <h1 className=" font-bold text-2xl text-center p-4 font-serif text-gray-400 bg-gradient-to-br from-blue-50 to-slate-600 bg-clip-text text-transparent">
            Change-password
          </h1>

          <FormField
            label=" Old Password "
            name="pldPassword"
            placeholder="Enter your old password here..."
            register={registerPassword}
            error={errors.oldPassword}
            type="text"
            rules={{
              required: "old password is required",
              pattern: {
                value: /^[a-zA-Z]+[0-9]+$/,
                message: "Invalid password format", // message if regex fails
              },
            }}
          />
          <FormField
            label=" Create Password "
            name="newPassword"
            placeholder="Enter your new password here..."
            register={registerPassword}
            error={errors.newPassword}
            type="text"
            rules={{
              required: "new password is required",
              pattern: {
                value: /^[a-zA-Z]+[0-9]+$/,
                message: "Invalid password format", // message if regex fails
              },
            }}
          />

          <FormField
            label=" Confirm Password "
            name="confirmPassword"
            placeholder="Enter your confirm password here..."
            register={registerPassword}
            error={errors.confirmPassword}
            type="text"
            rules={{
              required: "Confirm  password is required",
              pattern: {
                value: /^[a-zA-Z]+[0-9]+$/,
                message: "Invalid password format", // message if regex fails
              },
            }}
          />

          <div>
            <button
              type="onsubmit"
              className="bg-gradient-to-r from-cyan-400 via-slate-300 to-cyan-950 sm:text-lg text-sm px-2 py-1  mx-auto rounded-xl block text-white  my-10 font-serif shadow-md shadow-cyan-900 active:shadow-black  "
            >
              {issubmittingPassword ? `isSubmitting${dots} ` : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
