import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../../../Api/UserApi";
import { handleAxiosError } from "../../../../utils/erroeHandler";
import FormField from "../../../../utils/form/FormField";
import Heading from "../../../../utils/form/Heading";
import Button from "../../../../Tweet/UserTweet/Button";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register: registerSignin,
    handleSubmit: handleLoginSubmit,
    setError,
    formState: { errors, isSubmitting: isSubmittingLogin },
  } = useForm();
  const onLogin = async (userdata) => {
    try {
      console.log("token -reset", token);
      const res = await resetPassword(userdata, token);
      navigate("/login"); // ✅ call the function with args
      console.log(res.data.message); // handle success
      // redirect if needed
    } catch (err) {
      if (
        err?.response?.data?.message ===
        "Confirm Password is not matched with new password"
      ) {
        setError("confirmPassword", {
          type: "manual",
          message: "Confirm Password is not matched with new password",
        });
      }
      handleAxiosError(err, navigate);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleLoginSubmit(onLogin)}
        className="flex justify-center items-center h-[80vh] w-full p-4"
      >
        <div className="w-full max-w-md  bg-white  shadow-sm shadow-slate-500 p-8 rounded-md ">
          {/* Title */}
          <Heading label="🔒 Reset Password" />

          {/* New Password Field */}
          <FormField
            label="New Password"
            name="password"
            placeholder="Enter your new password..."
            register={registerSignin}
            error={errors.password}
            type="password"
            rules={{
              required: "Password is required",
              pattern: {
                value: /^[a-zA-Z]+[0-9]+$/,
                message: "Password must contain letters and numbers",
              },
            }}
          />

          {/* Confirm Password Field */}
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Re-enter your password..."
            register={registerSignin}
            error={errors.confirmPassword}
            type="password"
            rules={{
              required: "Confirm password is required",
              pattern: {
                value: /^[a-zA-Z]+[0-9]+$/,
                message: "Password must contain letters and numbers",
              },
            }}
          />

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-4">
            <Button
              label={isSubmittingLogin ? "Updating..." : "Reset Password"}
              bg="bg-blue-100 text-blue-600  hover:bg-blue-600"
            />
          </div>

          {/* Footer */}
          <p className="mt-4 text-center  sm:text-sm text-xs text-slate-700">
            Remembered your password?{" "}
            <span
              className="text-indigo-400 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
