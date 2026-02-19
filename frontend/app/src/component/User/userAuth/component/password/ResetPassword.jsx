import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../../../Api/UserApi";
import { handleAxiosError } from "../../../../utils/erroeHandler";
import FormField from "../../../../utils/form/FormField";

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
      handleAxiosError(err, navigate);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleLoginSubmit(onLogin)}
        className="flex justify-center items-center mt-24 w-full h-[80vh]"
      >
        <div className="w-full max-w-md  bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 backdrop-blur-lg rounded-xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            🔒 Reset Your Password
          </h2>

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
          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-500 
                 text-white py-2 px-4 rounded-lg font-semibold shadow-md 
                 hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            {isSubmittingLogin ? "Updating..." : "Reset Password"}
          </button>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-gray-300">
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
