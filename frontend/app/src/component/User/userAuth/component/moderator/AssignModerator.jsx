import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Assign_Moderator } from "../../../../../Api/UserApi";
import { handleAxiosError } from "../../../../utils/erroeHandler";
import FormField from "../../../../utils/form/FormField";
import FormButton from "../../../../utils/form/FormButton";
import Heading from "../../../../utils/form/Heading";


const AssignModerator = () => {
  const navigate = useNavigate();
  const {
    register: registerRole,
    handleSubmit: handleRole,
    setError,
    formState: { errors, isSubmitting: isSubmittingRole },
  } = useForm();

  const onLogin = async (userdata) => {
    try {
      const res = await Assign_Moderator(userdata);
      alert("✅ Moderator assigned successfully");
      // ✅ call the function with args
      if ((res.data.success = true)) {
        navigate("/");
      } // handle success

      // redirect if needed
    } catch (err) {
      handleAxiosError(err);
      if ((err.response.data.message = "User  not found")) {
        setError("email", {
          type: "manual",
          message:
            "❌ No account exists with this email. The user must sign up before assigning a role. ",
        });
      }
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleRole(onLogin)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        {/* Title */}
        <Heading label="Assign Moderator" />
       

        {/* Email Field */}
        <FormField
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
