import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { changePassword } from "../../../../../Api/UserApi.js";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "../../../../utils/erroeHandler.jsx";
import FormField from "../../../../utils/form/FormField";
import FormButton from "../../../../utils/form/FormButton";
import Heading from "../../../../utils/form/Heading.jsx";

const ChangePassword = () => {
  const [dots, setdots] = useState(".");
  const navigate = useNavigate();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting: issubmittingPassword },
  } = useForm();

  async function onPasswordSubmit(userdata) {
    try {
      const result = await changePassword(userdata);
      if (result.data.success === true) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (
        err?.response?.data?.message ===
        "Confirm Password is not matched with new password"
      ) {
        setError("confirmPassword", {
          type: "manual",
          message: "Confirm Password is not matched with new password",
        });
      }
      if (err?.response?.data?.message === "Invalid Old Password") {
        setError("oldPassword", {
          type: "manual",
          message: "Invalid Old Password",
        });
      }
      handleAxiosError(err);
      console.log("eror", err);
    }
  }
  useEffect(() => {
    setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 1000);
  }, [issubmittingPassword]);
  return (
    <>
      <div className="h-full w-full  ">
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="w-full sx:w-3/5 lg:w-2/5 sx:mx-auto space-y-5 p-5 rounded-xl bg-white mr-2 sx:mt-4 shadow-md border-slate-400   "
        >
          <FaLock className="h-5 w-5 text-gray-400 mr-2" />

          <Heading label="   Change-password" />

          <FormField
            label=" Old Password "
            name="oldPassword"
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
            <FormButton
              navigate={navigate}
              issubmitting={issubmittingPassword}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
