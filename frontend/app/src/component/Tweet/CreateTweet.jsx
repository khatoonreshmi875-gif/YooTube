import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { AppContext } from "../utils/contextApi";
import { handleAxiosError } from "../utils/erroeHandler";
import FormButton from "../utils/form/FormButton";
import FormField from "../utils/form/FormField";
import FormSelect from "../utils/form/FormSelect";

import { uploadTweet } from "../../Api/TweetApi";
import FormImageField from "../utils/form/FormImageField";
import Heading from "../utils/form/Heading";

const CreateTweet = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { video, onHandleVideoUserId, user } = useContext(AppContext);
  const navigate = useNavigate();
  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("videoId", form.videoId);
    for (const img of form.image) {
      formData.append("image", img);
    }
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
      .catch((err) => handleAxiosError(err));
  };
  const data = video;
  return (
    <div className="mx-auto      md:p-6 rounded-2xl  h-auto sm:mt-2   w-[98%]  pb-24 flex justify-center items-center min-h-0 bg-gray-100 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:bg-white sm:shadow-lg sm:rounded-lg sm:p-8 w-full sm:max-w-2xl space-y-6"
      >
        <Heading label="Create Tweet" />

        {/* Content */}
        <FormField
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
          msg="No video available.
You haven’t uploaded any video yet, so nothing can be displayed."
        />

        {/* Upload Images */}
        <FormImageField
          label="  Upload Images"
          register={register}
          name="image"
          className="w-full"
          error={errors.image}
          rules={{
            required: "At least one image is required",
            validate: (files) => {
              if (!files || files.length === 0) {
                return "At least one image is required";
              }
              if (files.length > 4) {
                return "You can upload a maximum of 4 images";
              }
              return true;
            },
          }}
          multiple={true}
          accept="image/*"
          watch={watch}
          message={
            " Please upload an image in 1080×1920 resolution (9:16 ratio). This size is required to ensure your tweet displays correctly"
          }
          isMargin={false}
        />

        {/* Submit Button */}
        <FormButton navigate={navigate} issubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default CreateTweet;
