import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUpdateAccountDetails } from "../../../Api/UserApi";
import { AppContext } from "../../utils/contextApi";
import { useAxiosErrorHandler } from "../../utils/erroeHandler";
import FormButton from "../../utils/form/FormButton";
import FormField from "../../utils/form/FormField";

const UpdateAccountDetails = () => {
  const { user, getallvideo, onHandle } = useContext(AppContext);
  const navigate = useNavigate();
    const handleAxiosError = useAxiosErrorHandler();
  
  const {
    register: registerVideo,
    handleSubmit: handleVideoSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingVideo },
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      channelName: user.channelName,
      email: user.email,
      description: user.description,
    },
  });
  async function onLogin(userdata) {
    try {
      const result = await getUpdateAccountDetails(userdata);
         navigate(`/curr-user/${user._id}/video`);
      navigate(0);
   
    } catch (err) {
      handleAxiosError(err);
    }
  }
  return (
    <div>
      <form
        onSubmit={handleVideoSubmit(onLogin)}
        className="flex flex-col justify-center sm:space-y-8 space-y-3 bg-white shadow-lg sm:rounded-xl  sm:mx-auto sm:w-[80%] sm:mt-4 w-full h-fit  py-28 px-2  pt-24"
        encType="multipart/form-data"
      >
        {" "}
        <h1 className="sm:text-3xl text-xl font-serif font-bold text-center text-blue-900  ">
          Update Profile
        </h1>
        <FormField
          label="fullName"
          name="fullName"
          placeholder="Enter your fullname here..."
          error={errors.description}
          register={registerVideo}
          rules={{
            required: "fullName is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 words ",
            },
          }}
        />{" "}
        <FormField
          label="Channel Name"
          name="channelName"
          placeholder="Enter your channel here..."
          error={errors.channelName}
          register={registerVideo}
          rules={{
            required: "channelName is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 words ",
            },
          }}
        />{" "}
        <FormField
          label="Email"
          name="email"
          placeholder="Enter your email here..."
          register={registerVideo}
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
        {/* Title */}
        {/* Video Upload */}
        {/* Thumbnail Upload */}
        <FormField
          label="Description"
          name="description"
          placeholder="Enter your description here..."
          error={errors.description}
          register={registerVideo}
          rules={{
            required: "description is required",
            minLength: {
              value: 2,
              message: "Name must be at least 25 words ",
            },
          }}
        />
        {/* Buttons */}
        <FormButton navigate={navigate} issubmitting={issubmittingVideo} />
      </form>
    </div>
  );
};

export default UpdateAccountDetails;
