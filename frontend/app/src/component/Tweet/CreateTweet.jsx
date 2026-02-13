import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/contextApi";
import { handleAxiosError } from "../utils/erroeHandler";
import FormField from "../Video/UserVideo/form/FormField";
import FormButton from "../Video/UserVideo/form/FormButton";
import FormSelect from "../Video/UserVideo/form/FormSelect";
import FormInput from "../Video/UserVideo/form/FormInput";
import { uploadTweet } from "../../Api/TweetApi";

const CreateTweet = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { video, onHandleVideoUserId, user } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(video);
  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("videoId", form.videoId);
    for (const img of form.image) {
      formData.append("image", img);
    }
    console.log("form", form?.videoId);
    const token = localStorage.getItem("token");
    const tweet = await uploadTweet(formData);
    if (tweet.data.success === true) {
      navigate(`/curr-user/${tweet.data.data.owner}/tweet-home`);
    }
  };
  const handleclick = async () => {
    onHandleVideoUserId(user._id)
      .then(() => {
        console.log("Video handled successfully");
      })
      .catch((err) => handleAxiosError(err, navigate));
  };
  const data = video;
  console.log("data", data);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 sm:mb-0 mb-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="sm:text-2xl text-xl font-semibold text-gray-700 mb-4 font-serif text-center ">
          Create Tweet
        </h2>

        {/* Content */}
        <FormInput
          label="Content"
          name="content"
          placeholder="Enter content here..."
          error={errors.title}
          register={register}
          rules={{
            required: "content is required",
            minLength: {
              value: 2,
              message: "content must be at least 2 words ",
            },
          }}
        />
        <FormSelect
          label=" Videos"
          register={register}
          name="videoId"
          error={errors.videoId}
          rules={{ required: " Video selection is required" }}
          accept="video/*"
          data={data}
          onClick={handleclick}
          isData={true}
        />

        {/* Upload Images */}
        <FormField
          label="  Upload Images"
          register={register}
          name="image"
          className="w-full"
          error={errors.image}
          rules={{ required: "At least one image is required" }}
          multiple={true}
          accept="image/*"
          watch={watch}
          message={
            " Please upload an image in 1080×1920 resolution (9:16 ratio). This size is required to ensure your tweet displays correctly"
          }
        />

        {/* Submit Button */}
        <FormButton navigate={navigate} issubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default CreateTweet;
