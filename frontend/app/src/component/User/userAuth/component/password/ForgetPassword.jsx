import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { forgetPassword } from "../../../../../Api/UserApi";
import { handleAxiosError } from "../../../../utils/erroeHandler";
import { useNavigate } from "react-router-dom";
import FormField from "../../../../utils/form/FormField";
import Heading from "../../../../utils/form/Heading";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [dots, setdots] = useState(".");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState(60);
  const {
    register: registerSignin,
    handleSubmit: handleLoginSubmit,
    formState: { errors, isSubmitting: isSubmittingLogin },
  } = useForm();

  const onLogin = async (userdata) => {
    try {
      await forgetPassword(userdata);
      setIsSubmitting(true);
      setIsDisabled(true);
    } catch (err) {
      handleAxiosError(err);
    }

    setInterval(() => {
      setCount((prev) => {
        if (prev < 1) {
          setIsDisabled(false);
          setIsSubmitting(false);
          return 60;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };
  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(timeUpdate);
  }, []);
  return (
    <div>
      <form
        onSubmit={handleLoginSubmit(onLogin)}
        className="w-full h-[80vh] flex justify-center items-center p-4 "
      >
        <div className="w-full max-w-md bg-white  rounded-xl shadow-lg p-8">
          {/* Title */}
          <Heading label=" Welcome Back" />

          {/* Email Field */}
          <FormField
            label="Email"
            name="email"
            placeholder="Enter your email..."
            register={registerSignin}
            error={errors.email}
            type="text"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
          />
          {/* Submit Button */}

          <button
            type="submit"
            className={`w-full mt-6 bg-blue-100 text-blue-600  hover:bg-blue-600 hover:text-white lg:text-base xs:text-sm text-xs
                py-2 px-4 rounded-md shadow-md 
                 hover:scale-105 hover:shadow-xl transition-transform duration-300 ${isDisabled ? "opacity-30" : "opacity-80"}
`}
            disabled={isDisabled}
          >
            {isSubmittingLogin ? `Sending link${dots}   ` : "Send Link"}
          </button>
          {isSubmitting && (
            <div className="mt-6 text-center">
              <p className="text-lg font-mono text-slate-400 animate-pulse">
                ⏳ Resend available in {count}
              </p>
            </div>
          )}
          {/* Footer */}
          <p className="mt-4 text-center sm:text-sm text-xs text-slate-700">
            Don’t have an account?{" "}
            <span
              className="text-indigo-400 hover:underline cursor-pointer "
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
