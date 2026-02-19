import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUpdateCoverImage } from "../../../Api/UserApi";
import UpdateFormThumbnail from "../../Video/EditVideo/UpdateFormThumbnail";
import FormButton from "../../utils/form/FormButton";

import { AppContext } from "../../utils/contextApi";
import { handleAxiosError } from "../../utils/erroeHandler";
import { RecommendedVideo } from "../../../Api/VideoApi";
import Heading from "../../utils/form/Heading";
const UpdateCoverImage = () => {
  const { user, getallvideo, setgetvideo, onHandle } = useContext(AppContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(user.coverImage || "");
  const {
    register: registerVideo,
    handleSubmit: handleVideoSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingVideo },
  } = useForm();
  async function onLogin(form) {
    const formData = new FormData();
    if (form.coverImage.length > 0) {
      formData.append("coverImage", form.coverImage?.[0]);
    } else {
      formData.append("coverImage", user.coverImage);
    }
    try {
      const result = await getUpdateCoverImage(formData);
      const result3 = await RecommendedVideo(0);
      setgetvideo(result3.data.data);
      onHandle();
      navigate(`/curr-user/${user._id}/video`);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  }
  return (
    <div>
      <form
        onSubmit={handleVideoSubmit(onLogin)}
        className="flex flex-col justify-center sm:space-y-8 space-y-3 bg-white shadow-lg sm:rounded-xl  sm:mx-auto sm:w-[80%] sm:mt-4 w-full h-fit  py-28 px-2  "
        encType="multipart/form-data"
      >
        <Heading label="Update Cover Image" />{" "}
        <UpdateFormThumbnail
          label=" Upload Cover Image"
          register={registerVideo}
          className="w-full"
          name="coverImage"
          error={errors.coverImage}
          message="Recommended size:2560 × 480.  
        If not, the image may appear cropped or distorted."
          rules={{
            validate: (fileList) => {
              // Case 1: user already has a cover image, skip validation
              if (user.coverImage && (!fileList || fileList.length === 0)) {
                return true;
              }

              // Case 2: no image provided
              if (!fileList || fileList.length === 0) {
                return "Cover image is required";
              }

              // Case 3: check dimensions
              const file = fileList[0];
              return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                  if (img.width !== 2560 || img.height !== 480) {
                    resolve("Image must be exactly 2560 × 480 pixels");
                  } else {
                    resolve(true);
                  }
                };
                img.src = URL.createObjectURL(file);
              });
            },
          }}
          preview={preview}
          data={user.coverImage}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              const img = new Image();
              img.onload = () => {
                if (img.width !== 2560 || img.height !== 480) {
                  alert("Image must be 2560 × 480 pixels!");
                }

                setPreview(url);
              };
            } else {
              setPreview(user.coverImage);
            }
          }}
        />
        {/* Buttons */}
        <FormButton navigate={navigate} issubmitting={issubmittingVideo} />
      </form>
    </div>
  );
};

export default UpdateCoverImage;
