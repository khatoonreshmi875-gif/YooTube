import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUpdateAvatar } from "../../../Api/UserApi";
import UpdateFormThumbnail from "../../Video/EditVideo/UpdateFormThumbnail";
import FormButton from "../../Video/UserVideo/form/FormButton";
import { AppContext } from "../../utils/contextApi";
import { handleAxiosError } from "../../utils/erroeHandler";
import { RecommendedVideo } from "../../../Api/VideoApi";

const UpdateAvatar = () => {
  const { user, setgetvideo, onHandle } = useContext(AppContext);
  console.log("user data.................", user.avatar);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(user.avatar || "");
  const {
    register: registerVideo,
    handleSubmit: handleVideoSubmit,
    watch,
    formState: { errors, isSubmitting: issubmittingVideo },
  } = useForm();
  async function onLogin(form) {
    const formData = new FormData();
    if (form.avatar.length > 0) {
      formData.append("avatar", form.avatar?.[0]);
    } else {
      formData.append("avatar", user.avatar);
    }
    console.log(formData);
    try {
      const result = await getUpdateAvatar(formData);

      const result3 = await RecommendedVideo(0);
      setgetvideo(result3.data.data);
      onHandle();
      navigate(`/curr-user/${user._id}/video`);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  }
  return (
    <>
      <form
        onSubmit={handleVideoSubmit(onLogin)}
        className="flex flex-col justify-center sm:space-y-8 space-y-3 bg-white shadow-lg sm:rounded-xl  sm:mx-auto sm:w-[80%] sm:mt-4 w-full h-fit  py-28 px-2  "
        encType="multipart/form-data"
      >
        {" "}
        <h1 className="sm:text-3xl text-xl font-serif font-bold text-center text-blue-900  ">
          Uplaod Profile Image
        </h1>
        <UpdateFormThumbnail
          label=" Upload Avatar"
          register={registerVideo}
          className="w-full"
          name="avatar"
          error={errors.avatar}
          message="Recommended size:1280 × 720.  
        If not, the image may appear cropped or distorted."
          rules={{
            required: user.avatar ? false : "avatar is required",
          }}
          preview={preview}
          data={user.avatar}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPreview(url);
            } else {
              setPreview(user.avatar);
            }
          }}
        />
        {/* Buttons */}
        <FormButton navigate={navigate} issubmitting={issubmittingVideo} />
      </form>
    </>
  );
};

export default UpdateAvatar;
