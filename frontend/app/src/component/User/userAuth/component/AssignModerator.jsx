import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Assign_Moderator } from "../../../../Api/UserApi";
import { handleAxiosError } from "../../../utils/erroeHandler";
import FormInput from "../../../Video/FormInput";
import FormButton from "../../../Video/UserVideo/FormButton";

const AssignModerator = () => {
  const navigate = useNavigate();
  const {
    register: registerRole,
    handleSubmit: handleRole,
    formState: { errors, isSubmitting: isSubmittingRole },
  } = useForm();

  const onLogin = async (userdata) => {
    try {
      const res = await Assign_Moderator(userdata);
      // ✅ call the function with args
      console.log(res.data.message); // handle success
      // redirect if needed
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleRole(onLogin)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Assign Moderator
        </h2>

        {/* Email Field */}
        <FormInput
          label="Email"
          name="email"
          placeholder="Enter user email..."
          register={registerRole}
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
        <FormButton
          isSubmitting={isSubmittingRole}
          navigate={navigate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        />
      </form>
    </div>
  );
};

export default AssignModerator;
