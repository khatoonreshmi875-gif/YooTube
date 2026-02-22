import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";
import { EditVideo } from "../../../Api/VideoApi";
import { handleAxiosError, useAxiosErrorHandler } from "../../utils/erroeHandler";
import UpdateFormThumbnail from "./UpdateFormThumbnail";
import FormButton from "../../utils/form/FormButton";
import FormField from "../../utils/form/FormField";
import Heading from "../../utils/form/Heading";
const UpdateVideo = () => {
  const { state } = useLocation();
  const videoId = state?.videoId;
  const location = useLocation();
    const handleAxiosError = useAxiosErrorHandler();
  
  const { video } = location.state || {};

  const navigate = useNavigate();
  const {
    register: registerVideoUpdate,
    handleSubmit: handleUpdateVideoSubmit,

    formState: { errors, isSubmitting: issubmittingVideoUpdate },
  } = useForm({
    defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
    },
  });

  const [videoData, setvideoData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    thumbnail: video?.thumbnail || "",
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.thumbnail.length > 0 && data.thumbnail) {
      formData.append("thumbnail", data.thumbnail[0]);
    } else {
      formData.append("thumbnail", videoData.thumbnail);
    }
    try {
      const result = await EditVideo(videoId, formData);
      if (result?.data?.success) {
        navigate(`/curr-user/${video?.owner?._id}/video`);
      }
    } catch (err) {
      (handleAxiosError(err));
    }
  };
  const [preview, setPreview] = useState(video?.thumbnail || "");

  return (
    <div className="mx-auto      md:p-6 rounded-2xl  h-auto sm:mt-2   w-[98%]  pb-24 flex justify-center items-center min-h-0 bg-gray-100 ">
      <form
        onSubmit={handleUpdateVideoSubmit(onSubmit)}
        className="sm:bg-white sm:shadow-lg sm:rounded-lg sm:p-8 w-full sm:max-w-2xl space-y-6"
      >
        <Heading label="Edit Video" />
        <FormField
          label="Title"
          name="title"
          placeholder="Enter your title here..."
          error={errors.title}
          register={registerVideoUpdate}
          rules={{
            required: "title is required",
            minLength: {
              value: 2,
              message: "title must be at least 2 words ",
            },
          }}
        />
        {/* Description */}
        <FormField
          label="Description"
          name="description"
          placeholder="Enter your description here..."
          error={errors.description}
          register={registerVideoUpdate}
          rules={{
            required: "description is required",
            minLength: {
              value: 2,
              message: "Name must be at least 25 words ",
            },
          }}
        />

        {/* Thumbnail Upload */}
        <UpdateFormThumbnail
          label=" Upload Thumbnail"
          register={registerVideoUpdate}
          className="w-full"
          name="thumbnail"
          data={videoData}
          error={errors.thumbnail}
          rules={{
            required: !videoData.thumbnail ? "thumbnail is required" : false,
          }}
          preview={preview}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPreview(url);
            } else {
              setPreview(playlist.thumbnail);
            }
          }}
        />

        {/* Submit Button */}

        <FormButton
          navigate={navigate}
          issubmitting={issubmittingVideoUpdate}
        />
      </form>
    </div>
  );
};

export default UpdateVideo;
