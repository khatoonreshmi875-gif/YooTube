import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { upload_Video } from "../../Api/VideoApi.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tags } from "./EditVideo/CategoryTag.js";
import FormField from "./UserVideo/form/FormField.jsx";
import FormInput from "./UserVideo/form/FormInput.jsx";
import FormSelect from "./UserVideo/form/FormSelect.jsx";
import FormButton from "./UserVideo/form/FormButton.jsx";
const UploadVideo = () => {
  const [stateValue, setstateValue] = useState("");
  const categories = [
    "Action",
    "Adventure",
    "Animation",
    "Art & Design",
    "Business & Finance",
    "Cars & Automobiles",
    "Comedy",
    "DIY & Crafts",
    "Documentary",

    "Drama",
    "Education",
    "Entertainment",
    "Fashion & Beauty",
    "Fitness",
    "Food & Cooking",
    "Gaming",
    "Health",
    "History & Culture",
    "Horror",
    "Kids & Family",
    "Lifestyle",
    "Motivation & Self-Help",
    "Music",
    "Mystery / Thriller",
    "News & Politics",
    "Podcasts & Talk Shows",
    "Reaction",
    "Review (Products, Movies, Tech)",
    "Romance",
    "Sci-Fi",
    "Science & Nature",
    "Short Film",
    "Spirituality & Religion",
    "Sports",
    "Technology",
    "Travel",
    "Tutorial / How-to",
    "Vlog",
  ];

  const navigate = useNavigate();
  const {
    register: registerVideo,
    handleSubmit: handleVideoSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingVideo },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);

    formData.append("description", data.description);
    formData.append("category", data.category);
    let tagsArray = [];
    if (Array.isArray(data.tagsSelect)) {
      tagsArray = [...data.tagsSelect];
    }
    if (data.tagsInput & (data.tagsInput.trim() !== "")) {
      const value = data.tagsInput
        .split(",")
        .filter((tag) => tag.trim() !== "");
      tagsArray.push(...value);
    }
    tagsArray.forEach((tag) => {
      formData.append("tags", tag);
    });
    formData.append("videofile", data.videofile?.[0] || null); // FileList → first file
    formData.append("thumbnail", data.thumbnail?.[0] || null);
    const token = localStorage.getItem("token");
    const result = await axios.post(
      "http://localhost:8000/api/v1/videos/upload-video",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (result?.data?.success) {
      navigate("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleVideoSubmit(onSubmit)}
        className="flex flex-col justify-center sm:space-y-8 space-y-3 bg-white shadow-lg sm:rounded-xl  sm:mx-auto sm:w-[80%] sm:mt-4 w-full h-fit  py-28 px-2  "
        encType="multipart/form-data"
      >
        {" "}
        <h1 className="sm:text-3xl text-xl font-serif font-bold text-center text-blue-900  ">
          Create your Video Post
        </h1>
        {/* Title */}
        <FormInput
          label="Title"
          name="title"
          placeholder="Enter your title here..."
          error={errors.title}
          register={registerVideo}
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
          register={registerVideo}
          rules={{
            required: "description is required",
            minLength: {
              value: 2,
              message: "Name must be at least 25 words ",
            },
          }}
        />
        {/* Category */}
        <FormSelect
          label="  Category"
          register={registerVideo}
          name="category"
          error={errors.category}
          rules={{ required: "category is required" }}
          data={categories}
          onChange={(e) => setstateValue(e.target.value)}
        />
        {/* Tags Select */}
        <FormSelect
          label="  Tags"
          register={registerVideo}
          name="tagsSelect"
          error={errors.tagsSelect}
          rules={{ required: "tags is required" }}
          multiple={true}
          data={tags[stateValue]}
        />
        {/* Tags Input */}
        <FormInput
          label=" Custom Tags"
          name="tagsInput"
          placeholder="Enter your tagsInput here..."
          error={errors.tagsInput}
          register={registerVideo}
          rules={{
            required: "tagsInput is required",
            minLength: {
              value: 2,
              message: "tags must be at least 2 words ",
            },
          }}
        />
        {/* Video Upload */}
        <FormField
          label="  Upload Video"
          register={registerVideo}
          name="videofile"
          className="w-full"
          error={errors.videofile}
          rules={{ required: "video is required" }}
          watch={watch}
          isVideo={true}
        />
        {/* Thumbnail Upload */}
        <FormField
          label=" Upload Thumbnail"
          register={registerVideo}
          className="w-full"
          name="thumbnail"
          error={errors.thumbnail}
          rules={{ required: "thumbnail is required" }}
          watch={watch}
        />
        {/* Buttons */}
        <FormButton navigate={navigate} issubmitting={issubmittingVideo} />
      </form>
    </>
  );
};

export default UploadVideo;
