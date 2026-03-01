import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { upload_Video } from "../../Api/VideoApi.js";
import { tags } from "./EditVideo/CategoryTag.js";

import FormField from "../utils/form/FormField.jsx";
import FormImageField from "../utils/form/FormImageField";
import FormButton from "../utils/form/FormButton";
import FormSelect from "../utils/form/FormSelect";
import Heading from "../utils/form/Heading.jsx";
import axios from "axios";
const UploadVideo = () => {
  const [stateValue, setstateValue] = useState("");
  const [uploadController, setUploadController] = useState(null);
  const [cloudinaryController, setCloudinaryController] = useState(null);

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
    reset,
    formState: { errors, isSubmitting: issubmittingVideo },
  } = useForm();

  const uploadToCloudinary = (file) => {
    if (!file) return null;
    const cloudCtrl = new AbortController();
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const res = axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      signal: cloudCtrl.signal,
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        console.log(`Upload progress: ${percent}%`);
      },
    });

    return { res, cloudCtrl }; // Cloudinary URL
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const { res, cloudCtrl } = uploadToCloudinary(data.videofile?.[0]);
    setCloudinaryController(cloudCtrl);
    const videoUrl = await res;
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
    formData.append("videoUrl", videoUrl.data.secure_url);
    formData.append("publicId", videoUrl.data.public_id);
    formData.append("duration", videoUrl.data.duration);
    formData.append("thumbnail", data.thumbnail?.[0] || null);
    const { request, controller } = upload_Video(formData);

    console.log("data of create video", request, controller);
    setUploadController(controller);

    try {
      const response = await request;
      console.log("data of create video", response);
      if (response?.data?.success) {
        navigate("/");
      }
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("❌ Upload canceled by user");
      } else {
        console.error("❌ Upload failed:", err);
      }
    }
  };

  return (
    <>
      <div className="bg-white mx-auto   items-center     md:p-6 rounded-2xl  h-auto sm:mt-2   w-[98%]  pb-24">
        <form
          onSubmit={handleVideoSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          {" "}
          <Heading label="Upload Video" />
          <div className="grid grid-cols-1 lg:grid-cols-2   mt-4 md:mr-6  ">
            {/* Title */}
            <div className="flex flex-col justify-center space-y-3 min-w-0  ">
              {" "}
              <FormField
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
              <FormField
                label="Description"
                name="description"
                placeholder="Enter your description here..."
                register={registerVideo}
                error={errors.description}
                type="text"
                rules={{
                  required: "description is required",
                  minLength: {
                    value: 25,
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
                multiple={true}
                data={tags[stateValue]}
              />
              {/* Tags Input */}
              <FormField
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
            </div>
            <div className="w-full mt-8 space-y-8">
              {" "}
              <FormImageField
                label="  Upload Video"
                register={registerVideo}
                name="videofile"
                className="w-full"
                error={errors.videofile}
                rules={{ required: "video is required" }}
                watch={watch}
                isVideo={true}
                message="You can't upload videos longer than 3 minutes."
              />
              {/* Thumbnail Upload */}
              <FormImageField
                label=" Upload Thumbnail"
                register={registerVideo}
                className="w-full"
                name="thumbnail"
                error={errors.thumbnail}
                rules={{ required: "thumbnail is required" }}
                watch={watch}
              />
            </div>
          </div>
          {/* Video Upload */}
          {/* Buttons */}
          <FormButton
            navigate={navigate}
            issubmitting={issubmittingVideo}
            oncancel={() => {
              if (cloudinaryController) {
                console.log("it runnnnn");
                cloudinaryController.abort();
                setCloudinaryController(null);
                reset();
                console.log("❌ Upload canceled");
              }
              w

              // cl
            }}
          />
        </form>
      </div>
    </>
  );
};

export default UploadVideo;
