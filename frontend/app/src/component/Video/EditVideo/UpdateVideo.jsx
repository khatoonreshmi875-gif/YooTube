import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";
import { EditVideo } from "../../../Api/VideoApi";
import FormButton from "../UserVideo/form/FormButton";
import { handleAxiosError } from "../../utils/erroeHandler";
import UpdateFormThumbnail from "./UpdateFormThumbnail";
import FormInput from "../UserVideo/form/FormInput";
const UpdateVideo = () => {
  const { state } = useLocation();
  const videoId = state?.videoId;
  const location = useLocation();
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
      (handleAxiosError(err), navigate);
    }
  };
  const [preview, setPreview] = useState(video?.thumbnail || "");

  return (
    <div className="sm:mx-auto sm:bg-slate-300 bg-white min-h-screen sm:flex  justify-center pt-2 mt-24 mb-24 sm:mb-0">
      <form
        onSubmit={handleUpdateVideoSubmit(onSubmit)}
        className="bg-white sm:p-8 sm:w-[80%] w-full h-fit p-2 sm:shadow-md rounded-xl space-y-5  "
      >
        <h2 className="sm:text-2xl text-xl font-serif font-medium sm:font-bold text-gray-600 sm:mb-6 text-center ">
          Edit Video
        </h2>
        <FormInput
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
        <FormInput
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
