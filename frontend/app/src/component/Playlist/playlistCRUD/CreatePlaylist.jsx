// import React from "react";
import { useForm } from "react-hook-form";
import { createPlaylists } from "../../../Api/Playlistapi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/contextApi";
import FormInput from "../../Video/FormInput";
import FormField from "../../Video/FormField";
import { handleAxiosError } from "../../utils/erroeHandler";
import FormButton from "../../Video/UserVideo/FormButton";

const CreatePlaylist = () => {
  const [dots, setdots] = useState(".");
  const { onHandleVideo } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register: registerPlaylist,
    handleSubmit: handlePlaylistSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingPlaylist },
  } = useForm();

  const onSubmit = async (form) => {
    const result = await onHandleVideo();
    console.log("playlist currUser", result);

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
      handleAxiosError(err, navigate);
    }
  };
  useEffect(() => {
    setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 1000);
  }, [issubmittingPlaylist]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24">
      <form
        onSubmit={handlePlaylistSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="sm:text-2xl font-semibold text-gray-800 sm:mb-4 mx-auto text-xl">
          Create Playlist
        </h2>

        {/* Name */}
        <FormInput
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
        <FormInput
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
        <FormInput
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
        <FormField
          label=" Upload Thumbnail"
          register={registerPlaylist}
          className="w-full"
          name="thumbnail"
          error={errors.thumbnail}
          rules={{ required: "thumbnail is required" }}
          watch={watch}
        />

        {/* Submit Button */}
        <FormButton navigate={navigate} issubmitting={issubmittingPlaylist} />
      </form>
    </div>
  );
};

export default CreatePlaylist;
