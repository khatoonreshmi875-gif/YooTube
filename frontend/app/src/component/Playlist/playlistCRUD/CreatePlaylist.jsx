// import React from "react";
import { useForm } from "react-hook-form";
import { createPlaylists } from "../../../Api/Playlistapi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/contextApi";

import {
  handleAxiosError,
  useAxiosErrorHandler,
} from "../../utils/erroeHandler";
import FormButton from "../../utils/form/FormButton.jsx";
import FormField from "../../utils/form/FormField.jsx";
import FormImageField from "../../utils/form/FormImageField.jsx";
import Heading from "../../utils/form/Heading.jsx";

const CreatePlaylist = () => {
  const { onHandleVideo } = useContext(AppContext);
  const navigate = useNavigate();
  const handleAxiosError = useAxiosErrorHandler();

  //useform
  const {
    register: registerPlaylist,
    handleSubmit: handlePlaylistSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingPlaylist },
  } = useForm();

  //form submit function
  const onSubmit = async (form) => {
    const result = await onHandleVideo();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("thumbnail", form.thumbnail[0]);
    try {
      const result2 = await createPlaylists(formData);
      if (result2?.data?.success) {
        const PlaylistId = result2?.data?.data?._id;
        navigate(`/add-playlist/${PlaylistId}`);
        navigate(0);
      }
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div className="mx-auto      md:p-6 rounded-2xl  h-auto sm:mt-2   w-[98%]  pb-24 flex justify-center items-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handlePlaylistSubmit(onSubmit)}
        className="sm:bg-white sm:shadow-lg sm:rounded-lg sm:p-8 w-full sm:max-w-2xl sm:space-y-6"
      >
        <Heading label="Create Playlist" />

        {/* Name */}
        <FormField
          label="Name"
          name="name"
          placeholder="Enter name here..."
          error={errors.title}
          register={registerPlaylist}
          rules={{
            required: "name is required",
            minLength: {
              value: 2,
              message: "name must be at least 2 words ",
            },
          }}
        />
        {/* Description */}
        <FormField
          label="Description"
          name="description"
          placeholder="Enter your description here..."
          error={errors.description}
          register={registerPlaylist}
          rules={{
            required: "description is required",
            minLength: {
              value: 2,
              message: "description must be at least 25 words ",
            },
          }}
        />

        {/* Category */}
        <FormField
          label="Category"
          name="category"
          placeholder="Enter category here..."
          error={errors.category}
          register={registerPlaylist}
          rules={{
            required: "category is required",
            minLength: {
              value: 2,
              message: "category must be at least 2 words ",
            },
          }}
        />

        {/* Thumbnail Upload */}
        <FormImageField
          label=" Upload Thumbnail"
          register={registerPlaylist}
          className="w-full"
          name="thumbnail"
          error={errors.thumbnail}
          message={
            "Recommended size:600× 338.  If not, the image may appear cropped or distorted."
          }
          isMargin={false}
          watch={watch}
        />

        {/* Submit Button */}
        <FormButton navigate={navigate} issubmitting={issubmittingPlaylist} />
      </form>
    </div>
  );
};

export default CreatePlaylist;
